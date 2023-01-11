const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');
const Queue = require('../queue');

let Q = new Queue();

//TESTING PENDING
const endHandler = async (socket, data) => {

    const gameId = data.gameId;
    const score = +data.score;

    const game = await Game.findById(gameId);
    const user = await User.findById(socket.wallet);

    let lock = false;

    // 1) enter scores into the game
    if (game.me === socket.wallet) {
        if (user.highScore < score) {
            user.highScore = score;
        }
        game.scoreMe = score;
        serverStore.getSocketServerInstance().to(serverStore.getMySocket(game.opponent)).emit("opponent-ended", score);
    } else {
        if (user.highScore < score) {
            user.highScore = score;
        }
        game.scoreOpponent = score;
        serverStore.getSocketServerInstance().to(serverStore.getMySocket(game.me)).emit("opponent-ended", score);
    }
    // remove active game from state for this user
    serverStore.removeGameInUser(socket.wallet);



    if (false && game.scoreMe !== -1 && game.scoreOpponent != -1) {
        // game khatam hogyi
        let res;
        let metadata;
        game.status = 'end';

        if (!lock) {
            lock = true;

            if (game.scoreMe > game.scoreOpponent) {
                metadata = await nft.nftFlow(game.me, game.opponent, game.tokenData.betToken, game.tokenData.amount);
                console.log(metadata);
                console.log(metadata.Ipfs);
                res = await reportWinner(game._id, game.scoreMe, metadata.Ipfs);
                console.log(res);
                if (res.success) {
                    serverStore.getSocketServerInstance().to(game.me).emit("game-over", game.scoreMe);
                    delete scores[gameId];
                    delete gameData[gameId];
                }
                else
                    serverStore.getSocketServerInstance().emit("issue");
            }
            else {
                metadata = await nft.nftFlow(address, scores[gameId].player1, gameData[gameId].betTokenName, gameData[gameId].amount);
                console.log(metadata);
                console.log(metadata.Ipfs);
                res = await reportWinner(gameId, address, metadata.Ipfs);
                console.log(res);
                if (res.success) {
                    io.to(gameId).emit("game over", address);
                    delete scores[gameId];
                    delete gameData[gameId];
                }
                else
                    io.to(gameId).emit("issue");
            }

            // unlock 
            lock = false;
        } else {
            // handle what to do if state is locked
            // add to queue
            Q.enqueue({ game: gameId, addy: address, scr: score });
        }
    }

    await user.save();
    await game.save();


}


const handleQueue = () => {
    if (Q.size() > 0) {
        console.log("some object is found in queue", Q.size());
        // run this function every second when queue is not empty
        if (!lock) {
            console.log("handling queue");
            // when lock is free
            // get details
            var ob = Q.dequeue();
            // call end (it handles lock as it is)
            end(ob.game, ob.addy, ob.scr);
        }
        console.log(Q.size());
    }
}

// setInterval(handleQueue, [1000]);

module.exports = endHandler;