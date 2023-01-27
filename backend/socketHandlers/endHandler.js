const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');
const Queue = require('../util/queue');
const reportWinner = require('../util/reportWinner');
const nft = require('../nft');
const updateHighScore = require("../util/updateHighScore");

let Q = new Queue();
let lock = false;

//TESTING PENDING
const endHandler = async (socket, data) => {

    const gameId = data.gameId;
    const score = +data.score;

    const game = await Game.findById(gameId);

    if (!game) {
        console.log('The game was not there for game Id' + gameId);
        return;
    }

    // 1) enter scores into the game
    await updateHighScore(gameId, socket.wallet, score);

    if (game.me === socket.wallet) {
        game.scoreMe = score;
        game.meFinished = true;
        serverStore.getSocketServerInstance().to(serverStore.getGamesAvailable().get(gameId).opponent).emit("opponent-ended", score);
    } else {
        game.scoreOpponent = score;
        game.opponentFinished = true;
        serverStore.getSocketServerInstance().to(serverStore.getGamesAvailable().get(gameId).me).emit("opponent-ended", score);
    }

    // remove active game from state for this user
    serverStore.removeGameInUser(socket.wallet);

    if (game.meFinished && game.opponentFinished) {
        // game khatam hogyi
        game.scoreMe > game.scoreOpponent ? game.winner = game.me : game.winner = game.opponent;
        handleEnding(game);
    }
    await game.save();

}

const handleEnding = async (game) => {
    let res;
    let metadata;
    game.status = 'complete';

    if (!lock) {
        lock = true;

        if (game.scoreMe > game.scoreOpponent) {
            updatePersonalGameStats(game.me, game.opponent);
            // metadata = await nft.nftFlow(game.me, game.opponent, game.tokenData.betToken, game.tokenData.amount);
            // console.log(metadata);
            // console.log(metadata.Ipfs);
            // res = await reportWinner(game._id, game.me, "metadata.Ipfs");
            // console.log(res);
            if (true) {
                serverStore.getSocketServerInstance().to(serverStore.getMySocket(game.me)).emit("game-over", game);
            } else emitErrorToAllPlayers(game);
        }
        else {
            updatePersonalGameStats(game.opponent, game.me);
            metadata = await nft.nftFlow(game.opponent, game.me, game.tokenData.betToken, game.tokenData.amount);
            // console.log(metadata);
            // console.log(metadata.Ipfs);
            res = await reportWinner(game._id, game.opponent, 'metadata.Ipfs');
            // console.log(res);
            if (res.success) {
                serverStore.getSocketServerInstance().to(serverStore.getMySocket(game.opponent)).emit("game-over", game);
            } else emitErrorToAllPlayers(game);

        }

        // unlock 
        lock = false;
    } else {
        // handle what to do if state is locked
        // add to queue
        Q.enqueue(game);
    }
}

const handleQueue = () => {
    if (Q.size() > 0) {
        // console.log("some object is found in queue", Q.size());
        // run this function every second when queue is not empty
        if (!lock) {
            // call end (it handles lock as it is)
            handleEnding(Q.dequeue());
        }
    }
}

setInterval(handleQueue, [1000]);

const updatePersonalGameStats = async (winnerId, loserId) => {
    await User.findByIdAndUpdate(winnerId, { $inc: { won: 1 } });
    await User.findByIdAndUpdate(loserId, { $inc: { lost: 1 } });
}

const emitErrorToAllPlayers = (game) => {
    serverStore.getSocketServerInstance().to(serverStore.getMySocket(game.me)).emit("issue");
    serverStore.getSocketServerInstance().to(serverStore.getMySocket(game.opponent)).emit("issue");
}


// setInterval(handleQueue, [1000]);

module.exports = { endHandler, handleEnding };