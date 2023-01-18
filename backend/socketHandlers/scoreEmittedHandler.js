const serverStore = require("../serverStore");
const Game = require('../models/gameModel');

const scoreEmittedHandler = async (socket, data) => {
    const wallet = socket.wallet;
    const socketData = serverStore.getConnectedUsers().get(wallet);
    if (!socketData.game) {
        socket.emit('status', 'You are not in a game');
    }

    const game = await Game.findById(socketData.game);

    // set score
    game.me === socket.wallet ? game.scoreMe = +data.score : game.scoreOpponent = +data.score;

    await game.save();
}

module.exports = scoreEmittedHandler;