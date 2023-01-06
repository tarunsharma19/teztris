const serverStore = require("../serverStore");

const newConnectionHandler = async (socket, data) => {
    console.log("data " + data);


    // gameData[gameId] = obj;
    // sockets[socket.id] = { gameID: gameId, me: socket.id, opponent: undefined };
    // this.join(gameId);
    // console.log("game data", gameData);
    // console.log(sockets);
};

module.exports = newConnectionHandler;
