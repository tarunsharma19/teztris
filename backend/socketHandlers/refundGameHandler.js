const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');

const refundGameHandler = async (socket) => {

    // 1) Find the user
    const user = await User.findById(socket.wallet);

    // 2) Check if user exists - (should never happen)
    if (!user) {
        socket.emit('exception', { errorMessage: 'User is not registered on database' });
        return;
    }


    // 3) Check if user has an active game
    if (user.activeGameId === undefined || user.activeGameId === null) {
        socket.emit('exception', { errorMessage: 'User does not have a game that can be refunded' });
        return;
    }

    // 4) Get the game from database
    let game = await Game.findById(user.activeGameId);

    // 5) Check if game can be refunded
    if (game.status !== 'init') {
        socket.emit('exception', { errorMessage: 'Game cannot be refunded' });
        return;
    }

    game.status = 'refund';
    game.refundReason = 'User ordered the refund';
    game = await game.save();

    // 5) Unset active game
    await User.findByIdAndUpdate(socket.wallet, { $unset: { activeGameId: 1 } });

    // 6) Remove the game from public/private lobby
    serverStore.removeGame(game._id);


    // 7) Emit the refunded game details back to the user
    socket.emit('game-refunded', { game });

    console.log(`GAME REFUNDED ${game._id}`.green.inverse)
}

module.exports = refundGameHandler;