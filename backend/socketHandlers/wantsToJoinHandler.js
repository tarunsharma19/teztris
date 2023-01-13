const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');

const wantsToJoinHandler = async (socket, data) => {

    // 1) Get all games available to play
    const allGames = serverStore.getAllGames();

    // 2) Extract game to be joined id
    const gameIdToBeJoined = data.uuid;
    allGames.filter((id) => id === gameIdToBeJoined);

    // 3) Return/fail if the game does not exist , or the game is not online
    if (!gameIdToBeJoined || allGames.length === 0) {
        socket.emit("status", "This game session does not exist");
        return;
    }

    // 4) Find the game from database and check if its being already played by 2 people or it was finished in past
    const game = await Game.findById(gameIdToBeJoined);
    if (!game) {
        socket.emit("status", "The game does not exist");
        return;
    }

    if (game.status === 'complete') {
        socket.emit("status", "The game was already finished");
        return;
    }

    if (game.status === 'ongoing') {
        socket.emit("status", "The game is already being played");
        return;
    }


    // OPTIONAL: can be removed if wanted
    if (game.me === socket.wallet) {
        socket.emit("status", "You cannot join your own game");
        return;
    }

    // 5) Update user as his game can't be continued and will have to give a result
    await User.findByIdAndUpdate(game.me, { $unset: { activeGameId: 1 } }, { new: true });

    // 6) Update Game Opponent
    game.opponent = socket.wallet;
    game.status = 'opponent-found';
    await game.save();

    // 7) Update server store to remove this game from active games
    serverStore.removeGame(gameIdToBeJoined);

    // 8) Emit that the match was found and the game can be started to the joinee and the host
    socket.emit("match-found", game);
    // console.log(serverStore.getGameMap(gameIdToBeJoined));
    serverStore.getSocketServerInstance().to(serverStore.getGameMap(gameIdToBeJoined)).emit("match-found", game);
    serverStore.addOpponentToGameMap(gameIdToBeJoined, socket.id);
};

module.exports = wantsToJoinHandler;
