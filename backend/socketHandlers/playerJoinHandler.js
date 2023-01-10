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
    const game = await Game.findOne({ gameId });

    // 4) Check game status
    if (game.status === 'complete') {
        socket.emit("status", "The game was already finished");
        return;
    }

    if (game.status === 'ongoing') {
        socket.emit("status", "The game is already being played");
        return;
    }

    // 5) Update game status
    game.status = 'ongoing';
    game.save();


    const me = game.me;
    const opponent = game.opponent;

    // 6) Update server status
    serverStore.setGameInUser(me, game.gameId);
    serverStore.setGameInUser(opponent, game.gameId);

    // 6) Emit start game status to both the users
    serverStore.getSocketServerInstance().to(serverStore.getMySocket(me)).emit("start-game", game);
    serverStore.getSocketServerInstance().to(serverStore.getMySocket(opponent)).emit("start-game", game);
}

module.exports = playerJoinHandler;