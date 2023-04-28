const serverStore = require("../serverStore");
const User = require('../models/userModel');
const Game = require('../models/gameModel');
const colors = require('colors');

const newConnectionHandler = async (socket, io) => {
  const walletId = socket.wallet;

  // 1) Find user from db to send details to server for profile
  let user = await User.findById(walletId);
  if (!user) {
    // 3) If no user exists or this is a new user then sign him up and send info
    user = await User.create({ _id: walletId })
  }

  // 4) Send user details
  socket.emit('user-details', user);

  // 5) Add to server store
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: walletId,
  });

  if (user.activeGameId) {
    const oldGame = await Game.findById(user.activeGameId);
    if (oldGame) {
      if (serverStore.addNewGame(oldGame._id, oldGame.isPublic, socket, oldGame.alias, oldGame.tokenData)) {
        console.log('Game added to server store'.green);
        socket.emit('old-game-found', oldGame);
      }
    } else {
      console.log('There was an error finding your old game. Please close this tab and reconnect again'.red.inverse);
      socket.emit('status', 'There was an error finding your old game. Please close this tab and reconnect again');
      return;
    }
  }
};

module.exports = newConnectionHandler;
