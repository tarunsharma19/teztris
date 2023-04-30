const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const updateHighScore = require("../util/updateHighScore");

const scoreEmittedHandler = async (socket, data) => {
    const wallet = socket.wallet;
    const socketData = serverStore.getConnectedUsers().get(wallet);

    if (!socketData.game) {
        socket.emit('status', 'You are not in a game');
        return;
    }

    const internalGame = serverStore.getGamesAvailable().get(socketData.game);

    if (!internalGame) return;

    if (internalGame.me === socket.id || internalGame.opponent === socket.id) {
        const score = +data.score;
        if (!score || score < 0) return;

        const game = await Game.findById(socketData.game);
        await updateHighScore(game._id, socket.wallet, score);

        // set score
        game.me === socket.wallet ? game.scoreMe = score : game.scoreOpponent = score;

        await game.save();
    } else {
        socket.emit('status', 'Cheating mt kr bhen ke laude');
    }
}

module.exports = scoreEmittedHandler;