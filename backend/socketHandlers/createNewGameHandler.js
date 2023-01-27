const serverStore = require("../serverStore");
const User = require("../models/userModel");
const Game = require('../models/gameModel');

const createNewGameHandler = async (socket, data, next) => {
    /* 
    Sample Data
    {
        "uuid": "123e4567-e89b-12d3-a456-426614174000",
        "alias": "test",
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
    const alias = data?.alias || '';

    // NOTE: cannot enter if condition in real life scenario. Only used for testing purposes
    if (await Game.findById(gameId)) {
        serverStore.addNewGame(gameId, isPublic, socket, alias);
        return;
    }

    // 1) Make a new game
    const newGame = await Game.create({
        _id: gameId, alias, isPublic, tokenData: data.obj, me: wallet
    });

    if (!newGame) {
        socket.emit('exception', { errorMessage: 'There was an error creating the game' });
        return;
    }

    // 2) Assign game to the user
    await User.findByIdAndUpdate(wallet, { activeGameId: newGame._id });

    // 3) Send the game to the server store
    serverStore.addNewGame(gameId, isPublic, socket, alias);
};

module.exports = createNewGameHandler;
