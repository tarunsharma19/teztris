const catchAsync = require('../util/catchAsync');
const Game = require('../models/gameModel');
const User = require('../models/userModel');

exports.getMe = catchAsync(async (req, res, next) => {
    if (!req.query.id) {
        throw new Error('Id not found');
    }

    const myWalletId = req.query.id;
    const me = await User.findById(myWalletId);
    const myGames = await Game.find({ $or: [{ me: myWalletId }, { opponent: myWalletId }] });

    res.send({
        status: 200,
        message: 'Fetched leaderboard successfully',
        me,
        myGames
    })
});