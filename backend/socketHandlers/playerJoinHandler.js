const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');

const playerJoinHandler = async (socket, data) => {

    // 1) Transaction is completed by opponent and wants to join the game
    const gameId = data.gameId;

    // 2) If the game does not exist or payload is empty / undefined
    if (!gameId) {
        socket.emit("status", "This game session does not exist.");
        return;
    }

    // 3) Find the game opponent wants to join
    const game = await Game.findById(gameId);
    if (!game) {
        socket.emit("status", "The game does not exist");
        return;
    }

    // 4) Check game status
    if (game.status === 'ongoing') {
        socket.emit("status", "The game is already being played");
        return;
    }

    if (game.status === 'complete') {
        socket.emit("status", "The game was already finished");
        return;
    }

    // 5) Update game status
    game.status = 'ongoing';
    await game.save();


    const me = game.me;
    const opponent = game.opponent;

    // 6) Update server status
    serverStore.setGameInUser(me, game._id);
    serverStore.setGameInUser(opponent, game._id);

    // 6) Emit start game status to both the users
    serverStore.getSocketServerInstance().to(serverStore.getGameMap(gameId)).emit("start-game", game);
}

module.exports = playerJoinHandler;