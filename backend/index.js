const TezosToolkit = require("@taquito/taquito");
const char2Bytes = require("@taquito/utils");
const InMemorySigner = require("@taquito/signer");
const nft = require("./nft");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});
require('dotenv').config();


var gameData = {};
var scores = {};
var sockets = {};
var gamesInSession = [];
var Q = new Queue();
var lock = false;


async function end(gameId, address, score) {
  console.log(gameId, address, score);
  let res;
  let metadata;

  if (scores[gameId] === undefined) {
    // kisi ka nai khatam hua 
    scores[gameId] = { player1: address, score1: score };
    console.log(scores);
    io.to(gameId).emit("p1 ended", score);
  }
  else {
    //  ek ka already khatam hogya
    // this is critical section code
    if (!lock) {
      // ate hi lock krdo state
      lock = true;

      // do work
      if (scores[gameId].score1 > score) {
        metadata = await nft.nftFlow(scores[gameId].player1, address, gameData[gameId].betTokenName, gameData[gameId].amount);
        console.log(metadata);
        console.log(metadata.Ipfs);
        res = await reportWinner(gameId, scores[gameId].player1, metadata.Ipfs);
        console.log(res);
        if (res.success) {
          io.to(gameId).emit("game over", scores[gameId].player1);
          delete scores[gameId];
          delete gameData[gameId];
        }
        else
          io.to(gameId).emit("issue");

      }
      else {
        metadata = await nft.nftFlow(address, scores[gameId].player1, gameData[gameId].betTokenName, gameData[gameId].amount);
        console.log(metadata);
        console.log(metadata.Ipfs);
        res = await reportWinner(gameId, address, metadata.Ipfs);
        console.log(res);
        if (res.success) {
          io.to(gameId).emit("game over", address);
          delete scores[gameId];
          delete gameData[gameId];
        }
        else
          io.to(gameId).emit("issue");
      }

      // unlock 
      lock = false;
    } else {
      // handle what to do if state is locked
      // add to queue
      Q.enqueue({ game: gameId, addy: address, scr: score });

      // now handle queue using set timeout


    }



    console.log(scores, gameData);

  }

}

const handleQueue = () => {
  // console.log("checking queue");

  if (Q.size() > 0) {
    console.log("some object is found in queue", Q.size());
    // run this function every second when queue is not empty
    if (!lock) {
      console.log("handling queue");
      // when lock is free
      // get details
      var ob = Q.dequeue();
      // call end (it handles lock as it is)
      end(ob.game, ob.addy, ob.scr);
    }
    console.log(Q.size());
  }
}

setInterval(handleQueue, [1000]);





io.sockets.on("connection", (socket) => {
  console.log("someone connected");
  console.log(socket.id);
  gamesInSession.push(socket);

  socket.on("end", end);

  socket.on("createNewGame", createNewGame);

  socket.on("wantsToJoin", wantsToJoin);

  socket.on("playerJoinsGame", playerJoinsGame);

  socket.on("disconnect", onDisconnect);

  // socket.on("disconnect", () => {
  //   console.log("someone disconnected");
  //   console.log(socket.id);
  //   // tetris.onDisconnect(socket);
  //   // tetris.initializeGame(io, socket);
  // });

  function onDisconnect() {
    console.log(`person disconnect ${socket.id}`);

    if (sockets[socket.id] === undefined) {
      // do nothing let them leave
    }
    else {

      let me = sockets[socket.id];
      console.log(me);
      console.log(scores);
      console.log(gameData);

      if (me.opponent === undefined) {
        // yani opponent nahi mila aur mai bi chla gya
        //  ya opponent chod dia phle hi
      }
      else if (gameData[me.gameID] && (scores[me.gameID] === undefined)) {
        // they leave the forfeit 
        // make opponent undefined
        sockets[me.opponent].opponent = undefined;
        end(me.gameID, "User Disconnected", 0);
      }

    }

    console.log(sockets);

    delete sockets[socket.id];

    console.log(sockets);

    var i = gamesInSession.indexOf(socket);
    gamesInSession.splice(i, 1);
  }

  function wantsToJoin(gameId) {
    console.log("joining " + io.sockets.adapter.rooms);

    var room = io.sockets.adapter.rooms.get(gameId);
    console.log(room);

    if (room === undefined) {
      this.emit("status", "This game session does not exist.");
      return;
    }
    if (room.size < 2) {

      this.emit("match found", gameData[gameId]);

    } else {

      this.emit("status", "There are already 2 people playing in this room.");
    }
  }

  function playerJoinsGame(idData) {
    console.log("joining " + io.sockets.adapter.rooms);

    var sock = this;

    var room = io.sockets.adapter.rooms.get(idData.gameId);
    console.log(room);

    if (room === undefined) {
      this.emit("status1", "This game session does not exist.");
      return;
    }
    if (room.size < 2) {
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

    } else {
      this.emit("status1", "There are already 2 people playing in this room.");
    }
  }




  function createNewGame(gameId, obj) {
    // Number(obj.amount),obj.betToken,obj.betTokenId,obj.betTokenType, 6 ,gameIdInput
    console.log("createNewGame " + gameId);
    gameData[gameId] = obj;
    sockets[socket.id] = { gameID: gameId, me: socket.id, opponent: undefined };
    this.join(gameId);
    console.log("game data", gameData);
    console.log(sockets);
  }

  //  as game ends kisi ki bi
});


http.listen(process.env.PORT || 8080, function () {
  console.log("listening on *:8080");
});


const reportWinner = async (
  gameID,
  winner,
  metadata
) => {

  try {
    const Tezos = new TezosToolkit.TezosToolkit("https://rpc.tzkt.io/mainnet");
    Tezos.setProvider({
      signer: new InMemorySigner.InMemorySigner(process.env.PVT_KEY),
    });

    const teztrisInstance = await Tezos.contract.at("KT1TkkM9g5TB2sZ86aomf1tF2kEVC5Yec6jU");

    console.log("check logs here");

    const metadataString = `ipfs://`+metadata;
    console.log(metadataString);

    console.log(char2Bytes.char2Bytes(metadata));


    let batch = Tezos.wallet
      .batch()
      .withContractCall(teztrisInstance.methods.reportWinner(gameID, { "": char2Bytes.char2Bytes(metadataString) }, winner));

    const batchOperation = await batch.send();

    console.log("final call");

    await batchOperation.confirmation().then(() => batchOperation.opHash);
    console.log("return hona chie");
    return {
      success: true,
      operationId: batchOperation.hash,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

function Queue() {
  this.stac = new Array();
  this.dequeue = function () {
    return this.stac.pop();
  }
  this.enqueue = function (item) {
    this.stac.unshift(item);
  }
  this.size = function () {
    return this.stac.length;
  }
}
