const colors = require('colors');

const verifyTokenSocket = (socket, next) => {
  try {
    const wallet = socket.handshake.headers?.auth;
    console.log('Connection Inititated - Inside auth socket'.green);
    if (!wallet) {
      console.log('No wallet provided in auth'.red.inverse);
      throw new Error('Please provide wallet id');
    }

    console.log(`Wallet Found - ${wallet}`.cyan.inverse);
    socket.wallet = wallet;
  } catch (err) {
    console.log('NOT_AUTHORIZED'.red.inverse);
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;
