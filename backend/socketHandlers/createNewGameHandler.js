const serverStore = require("../serverStore");
const User = require("../models/userModel");
const Game = require('../models/gameModel');

const createNewGameHandler = async (socket, data) => {
    /* 
    Sample Data
    {
        "uuid": "123e4567-e89b-12d3-a456-426614174000",
        "isPublic" : true,
        "obj": {
        "amount": 2,
        "betToken": "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
        "betTokenType": "FA1.2",
        "betTokenId": 0,
        "betTokenName": "ctez"
        }
    }

    */

    const wallet = socket.wallet;
    const gameId = data.uuid;
    const isPublic = data?.isPublic || false;
    const tokenData = data.obj;

    if (await Game.find({ gameId })) {
        // game already exists ...
        // TODO: yaha pe aaye kaise . 2 uuid kaise exist krti
        serverStore.addNewGame(gameId, isPublic);
        return;
    }
    const newGame = await Game.create({ gameId, isPublic, tokenData: tokenData, me: wallet });

    const user = await User.findOne({ walletId: wallet });
    user.activeGameId = newGame._id;
    user.save();

    serverStore.addNewGame(gameId, isPublic);
};

module.exports = createNewGameHandler;
