const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');


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
        socketData.sockets = socketData.sockets.filter((sock) => sock !== socket.id);
        connectedUsers.set(socket.wallet, socketData)
    }

    console.log(connectedUsers);
}

//TODO: end handle logic

const handleGame = async (socket, connectedUsers, gamesAvailable) => {
    const socketData = connectedUsers.get(socket.wallet);
    const user = await User.findById(socket.wallet);
    if (socketData.game) {
        if (user.activeGameId) {
            // no one joined the game
            gamesAvailable.delete(socketData.game);
            connectedUsers.set(socket.wallet, { ...connectedUsers.get(socket.wallet), game: null });
            serverStore.removeGame(socketData.game);
        } else {
            const game = await Game.findById(socketData.game);
            if (gamesAvailable.get(socketData.game).me === socket.id) {
                // he was the creator of the game
                gamesAvailable.get(socketData.game).me = null;
                game.scoreMe === -1 ? game.scoreMe = 0 : game.scoreMe = game.scoreMe;
                if (!game.winner && game.scoreOpponent > game.scoreMe) {
                    game.winner = game.opponent;
                }
            } else {
                // he was the opponent of the game
                gamesAvailable.get(socketData.game).opponent = null;
                game.scoreOpponent === -1 ? game.scoreOpponent = 0 : game.scoreOpponent = game.scoreOpponent;
                if (!game.winner && game.scoreOpponent < game.scoreMe) {
                    game.winner = game.me;
                }
            }

            await game.save();
        }
    }
}

module.exports = disconnectHandler;