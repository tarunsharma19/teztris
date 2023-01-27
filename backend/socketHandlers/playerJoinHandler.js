const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');

const playerJoinHandler = async (socket, data) => {

    // 1) Transaction is completed by opponent and wants to join the game
    const gameId = data.gameId;

    // 2) If the game does not exist or payload is empty / undefined
    if (!gameId) {
        socket.emit("status", "Empty payload");
        return;
    }

    // 3) Find the game opponent wants to join
    const game = await Game.findById(gameId);
    if (!game) {
        socket.emit("status", "The game does not exist. Internal Server Error. Please put in a request to the developers");
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

    // 5) Update user as his game can't be continued and will have to give a result
    await User.findByIdAndUpdate(game.me, { $unset: { activeGameId: 1 } }, { new: true });

    // 6) Update game status and Game Opponent
    game.opponent = socket.wallet;
    game.status = 'ongoing';
    await game.save();

    const opponent = game.opponent;
    // 7) Update server store to remove this game from active games and update opponent in game map
    serverStore.removeGame(game._id);
    serverStore.addOpponentToGameMap(game._id, socket.id);
    serverStore.setGameInUser(opponent, game._id);

    // 8) Emit start game status to both the users
    const gameSockets = serverStore.getGameMap(gameId);
    // console.log(gameSockets);
    serverStore.getSocketServerInstance().to(gameSockets.me).emit("start-game", game);
    serverStore.getSocketServerInstance().to(gameSockets.opponent).emit("start-game", game);
}

module.exports = playerJoinHandler;