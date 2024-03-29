const catchAsync = require('../util/catchAsync');
const Game = require('../models/gameModel');
const User = require('../models/userModel');

exports.leaderboard = catchAsync(async (req, res, next) => {
    let query = {};
    let limit = req.query.limit || 10;
    let sort = {};

    if (req.query.highscore) {
        sort = { highScore: +req.query.highscore }
    } else if (req.query.won) {
        sort = { won: +req.query.won }
    } else if (req.query.lost) {
        sort = { lost: +req.query.lost }
    }
    // console.log(sort);
    const users = await User.find(query).sort(sort).limit(limit);

    res.send({
        status: 200,
        message: 'Fetched leaderboard successfully',
        users
    })
});