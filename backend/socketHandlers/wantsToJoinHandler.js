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
    if (!gameIdToBeJoined || allGames.size === 0) {
        socket.emit("status", "This game session does not exist.");
        return;
    }

    // 4) Find the game from database and check if its being already played by 2 people
    const game = await Game.findOne({ gameId: gameIdToBeJoined });
    if (game.opponent) {
        socket.emit("status", "There are already 2 people playing in this room.");
        return;
    }

    // 5) Update user as his game is active anymore
    await User.findOneAndUpdate({ walletId: game.me }, { activeRoomId: null }, { new: true });

    // 6) Update Game Opponent
    game.opponent = socket.wallet;

    // 7) Update server store to remove this game from active games
    serverStore.gameJoined(gameIdToBeJoined);

    // 8) Emit that the match was found and the game can be started
    socket.emit("match-found", game);

};

module.exports = wantsToJoinHandler;
