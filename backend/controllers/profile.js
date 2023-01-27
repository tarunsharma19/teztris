const catchAsync = require('../util/catchAsync');
const Game = require('../models/gameModel');
const User = require('../models/userModel');

// NOTE: can be divided into multiple parts according to front end
exports.getMe = catchAsync(async (req, res, next) => {
    if (!req.query.id) {
        throw new Error('Id not found');
    }

    const myWalletId = req.query.id;
    const me = await User.findById(myWalletId);
    const myGames = await Game.find({ $or: [{ me: myWalletId }, { opponent: myWalletId }] });

    const winnerPipeline = [
        {
            '$match': {
                'winner': myWalletId
            }
        }, {
            '$group': {
                '_id': {
                    'betToken': '$tokenData.betToken',
                    'betTokenId': '$tokenData.betTokenId'
                },
                'totalAmountWon': {
                    '$sum': '$tokenData.amount'
                }
            }
        }
    ];

    const loserPipeline = [
        {
            '$match': {
                '$or': [
                    {
                        'me': myWalletId
                    }, {
                        'opponent': myWalletId
                    }
                ],
                'winner': {
                    '$ne': myWalletId
                }
            }
        }, {
            '$group': {
                '_id': {
                    'betToken': '$tokenData.betToken',
                    'betTokenId': '$tokenData.betTokenId'
                },
                'totalAmountLost': {
                    '$sum': '$tokenData.amount'
                }
            }
        }
    ]

    const winnings = await Game.aggregate(winnerPipeline);
    const loosings = await Game.aggregate(loserPipeline);

    res.send({
        status: 200,
        message: 'Fetched leaderboard successfully',
        me,
        myGames,
        winnings,
        loosings
    })
});

