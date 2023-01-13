const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');


const disconnectHandler = async (socket) => {
    // 1) If he has a active game that no one has joined - remove from public and private lobbies
    const connectedUsers = serverStore.getConnectedUsers();

    const socketData = connectedUsers.get(socket.wallet);
    const user = await User.findById(socket.wallet);

    // 3) If only single socket exists then disconnect him and remove his active game id from server state
    if (socketData.sockets.length === 1) {
        if (user.activeGameId !== null) {
            // removing unfinished game
            serverStore.removeGame(user.activeGameId);
        }
        // socket.id disconnet hori vo check kro hai ki nhi game me
        await handleGame(socket, socketData);

        connectedUsers.delete(socket.wallet);

    } else {
        // socket.id disconnet hori vo check kro hai ki nhi game me
        await handleGame(socket, socketData);

        // 4) Else remove only current socket and leave others active
        socketData.sockets = socketData.sockets.filter((sock) => sock !== socket.id);
        connectedUsers.set(socket.wallet, socketData)
    }


}

const handleGame = async (socket, socketData) => {
    if (socketData.game) {
        // declare his score 0 if not finished
        const game = await Game.findById(socketData.game);
        if (game.me === socket.wallet) {
            if (game.scoreMe === -1) {
                game.scoreMe = 0;
                // declare opponent winner
                serverStore.getGameMap(socketData.game).forEach(sock => {
                    if (sock !== socket.wallet) {
                        serverStore.getSocketServerInstance().to(sock).emit('match-ended', 'Opponent left the game');
                        // delete game from ongoing games
                        serverStore.deleteGameIdfromGameMap(socketData.game);
                    }
                });
            }
        } else {
            if (game.scoreOpponent === -1) {
                game.scoreOpponent = 0;
                // declare opponent winner
                serverStore.getGameMap(socketData.game).forEach(sock => {
                    if (sock !== socket.wallet) {
                        serverStore.getSocketServerInstance().to(sock).emit('match-ended', 'Opponent left the game');
                        // delete game from ongoing games
                        serverStore.deleteGameIdfromGameMap(socketData.game);
                    }
                });
            }
        }

        if (game.scoreMe === 0 && game.scoreOpponent === 0) {
            //update game status
            game.status = 'complete';
        }
        await game.save();
    }
}

module.exports = disconnectHandler;