const serverStore = require("../serverStore");
const User = require('../models/userModel');

const newConnectionHandler = async (socket, io) => {
  const walletId = socket.wallet;

  //TODO: check for previous game and any other information as well

  let user = await User.findOne({ walletId });
  if (!user) {
    user = await User.create({ walletId })
  }
  socket.emit('user-details', user);

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: walletId,
  });
};

module.exports = newConnectionHandler;
