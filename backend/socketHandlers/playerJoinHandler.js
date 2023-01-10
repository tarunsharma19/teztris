const serverStore = require("../serverStore");
const Game = require('../models/gameModel');
const User = require('../models/userModel');

const playerJoinHandler = async (socket, data) => {

    var sock = this;

    var room = io.sockets.adapter.rooms.get(idData.gameId);
    console.log(room);

    if (room === undefined) {
        this.emit("status1", "This game session does not exist.");
        return;
    }

    sock.join(idData.gameId);

    console.log(room.size);

    let opp = undefined;

    Object.keys(sockets).forEach(function (key) {
        if (sockets[key].gameID === idData.gameId) {
            opp = sockets[key];
        }
    });

    //  for(var x of sockets){
    //    if(x.gameID === idData.gameId){
    //       opp = x;
    //    }
    //  }

    sockets[socket.id] = { gameID: idData.gameId, me: socket.id, opponent: opp.me };

    sockets[opp.me].opponent = socket.id;

    console.log(sockets);

    io.sockets.in(idData.gameId).emit("start game");
}

module.exports = playerJoinHandler;