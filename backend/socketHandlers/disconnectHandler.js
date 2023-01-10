const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');

//TESTING PENDING
const disconnectHandler = async (socket) => {
    // 1) If he has a active game that no one has joined - remove from public and private lobbies
    const connectedUsers = serverStore.getConnectedUsers();

    let wallet = null;

    for (let [key, value] of connectedUsers) {
        let sockets = value.sockets;
        // 1) Find user for corresponding game
        sockets.forEach(sock => {
            if (sock === socket.id) {
                wallet = key;
                value = value;
            }
        });
    }


    // 2) If found then perform action
    if (wallet) {
        const socketData = connectedUsers.get(wallet);
        const user = await User.findOne({ walletId: wallet });
        if (socketData.sockets.length === 1) {
            // 3) If only single socket exists then disconnect him and remove his active game id from server state
            if (user.activeGameId !== null) {
                serverStore.removeGame(await Game.findById(user.activeGameId).gameId);
            }
            connectedUsers.delete(wallet);
        } else {
            // 4) Else remove only current socket and leave others active
            socketData.sockets = socketData.sockets.filter((sock) => sock !== socket.id);
            connectedUsers.set(wallet, socketData)
        }
    }

}

module.exports = disconnectHandler;