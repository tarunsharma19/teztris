const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');

const wantsToJoinHandler = async (socket, data) => {

    console.log(`${socket.wallet} wants to join a game`.cyan.inverse);

    // 1) Extract game to be joined id
    const gameIdToBeJoined = data.uuid;
    if (!gameIdToBeJoined) {
        socket.emit("exception", "Empty payload");
        return;
    }

    // 2) Get all games available to play
    const allGames = serverStore.getAllGames();
    allGames.filter((id) => id === gameIdToBeJoined);

    // 3) Return/fail if the game does not exist , or the game is not online
    if (allGames.length === 0) {
        socket.emit("status", "This game session does not exist");
        return;
    }

    // 4) Find the game from database and check if its being already played by 2 people or it was finished in past
    const game = await Game.findById(gameIdToBeJoined);
    if (!game) {
        socket.emit("status", "The game does not exist. Internal Server Error. Please put in a request to the developers");
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

    // 5) Emit that the match was found and the game can be started to the joinee and the host
    socket.emit("match-found", game);
};

module.exports = wantsToJoinHandler;
