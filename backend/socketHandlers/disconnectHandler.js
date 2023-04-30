const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const { handleEnding } = require("./endHandler");


const disconnectHandler = async (socket) => {
    // 1) If he has a active game that no one has joined - remove from public and private lobbies
    const connectedUsers = serverStore.getConnectedUsers();
    const gamesAvailable = serverStore.getGamesAvailable();

    await handleGame(socket, connectedUsers, gamesAvailable);
    const socketData = connectedUsers.get(socket.wallet);

    // 3) If only single socket exists then disconnect him and remove his active game id from server state
    if (socketData.sockets.length === 1) {
        connectedUsers.delete(socket.wallet);
    } else {
        // 4) If multiple sockets exist then remove the socket id from the array
        socketData.sockets = socketData.sockets.filter((sock) => sock !== socket.id);
        connectedUsers.set(socket.wallet, socketData)
    }

    // console.log(connectedUsers);
}

const handleGame = async (socket, connectedUsers, gamesAvailable) => {
    const socketData = connectedUsers.get(socket.wallet);
    if (!socketData.game) {
        // No game is running, just disconnect him
        return;
    }

    if (!(gamesAvailable.get(socketData.game).opponent)) {
        // no one joined the game
        if (socket.id === gamesAvailable.get(socketData.game).me) {
            gamesAvailable.delete(socketData.game);
            connectedUsers.set(socket.wallet, { ...connectedUsers.get(socket.wallet), game: null });
            serverStore.removeGame(socketData.game);
        }
    } else {
        const game = await Game.findById(socketData.game);
        if (gamesAvailable.get(socketData.game).me === socket.id) {
            // he was the creator of the game
            gamesAvailable.get(socketData.game).me = null;
            game.meFinished = true;

            // emit score to opponent
            serverStore.getSocketServerInstance().to(serverStore.getGamesAvailable().get(socketData.game).opponent).emit("opponent-ended", game.scoreMe);
        } else if (gamesAvailable.get(socketData.game).opponent === socket.id) {
            // he was the opponent of the game
            gamesAvailable.get(socketData.game).opponent = null;
            game.opponentFinished = true;

            // emit score to opponent
            serverStore.getSocketServerInstance().to(serverStore.getGamesAvailable().get(socketData.game).me).emit("opponent-ended", game.scoreOpponent);
        } else {
            return;
        }

        if (game.meFinished && game.opponentFinished) {
            // game khatam hogyi
            game.scoreMe > game.scoreOpponent ? game.winner = game.me : game.winner = game.opponent;
            await game.save();
            handleEnding(game);
        }

        await game.save();
    }
}


module.exports = disconnectHandler;