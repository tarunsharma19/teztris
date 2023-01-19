const Game = require('../models/gameModel');
const User = require('../models/userModel');

module.exports = async (gameId, userWallet, score) => {
    const game = await Game.findById(gameId);
    const user = await User.findById(userWallet);

    if (game.me === userWallet) {
        if (score > user.highScore) {
            user.highScore = score;
        }
    }
    else {
        if (score > user.highScore) {
            user.highScore = score;
        }
    }

    await user.save();
}