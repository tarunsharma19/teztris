const Game = require('../models/gameModel');
const User = require('../models/userModel');

module.exports = async (gameId, userWallet, score) => {
    const game = await Game.findById(gameId);
    const user = await User.findById(userWallet);

    if (!game || !user) {
        console.log('The game was not there for game Id' + gameId + 'or there was no user with wallet id' + userWallet);
        return;
    }

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