const serverStore = require("../serverStore");
const User = require("../models/userModel");
const Game = require('../models/gameModel');
const colors = require('colors');

const createNewGameHandler = async (socket, data, next) => {
    /* 
    Sample Data

    {
        "uuid": "123e4567-e89b-12d3-a456-426614174000",
        "isPublic": true,
        "alias": "test1",
        "obj": {
            "amount": 2,
            "betToken": "KT1Q4qRd8mKS7eWUgTfJzCN8RC6h9CzzjVJb",
            "betTokenType": "FA1.2",
            "betTokenId": 0,
            "betTokenName": "ctez"
        }
    }

    */

    if (!data.uuid) socket.emit('exception', { errorMessage: 'Please provide a game id' });

    const wallet = socket.wallet;
    const gameId = data.uuid;
    const isPublic = data?.isPublic || false;
    const alias = data?.alias || '';

    console.log(`${wallet} is creating a new game - ${gameId}`.cyan.inverse);

    // NOTE: cannot enter if condition in real life scenario. Only used for testing purposes
    if (await Game.findById(gameId)) {
        console.log(`Game already exists in database - ${gameId}`.red.inverse);
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
    serverStore.addNewGame(gameId, isPublic, socket, alias, data.obj);
};

module.exports = createNewGameHandler;
