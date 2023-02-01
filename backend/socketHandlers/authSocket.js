
const verifyTokenSocket = (socket, next) => {
  try {
    const wallet = socket.handshake.headers?.auth;
    console.log('someone trying to connect');
    if (!wallet) {
      throw new Error('Please provide wallet id');
    }
    socket.wallet = wallet;
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  next();
};

module.exports = verifyTokenSocket;
