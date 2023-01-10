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

    // NOTE: cannot enter if condition in real life scenario. Only used for testing purposes
    if (await Game.findOne({ gameId })) {
        serverStore.addNewGame(gameId, isPublic);
        return;
    }

    // 1) Make a new game
    const newGame = await Game.create({ gameId, isPublic, tokenData: tokenData, me: wallet });

    // 2) Assign game to the user
    await User.findOneAndUpdate({ walletId: wallet }, { activeGameId: newGame._id });

    // 3) Send the game to the server store
    serverStore.addNewGame(gameId, isPublic);
};

module.exports = createNewGameHandler;
