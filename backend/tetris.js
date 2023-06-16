// import { InMemorySigner} from '@taquito/signer';
// import { char2Bytes } from '@taquito/utils';
// import {TezosToolkit} from '@taquito/taquito'

const TezosToolkit = require("@taquito/taquito");
const char2Bytes = require("@taquito/utils");
const InMemorySigner = require("@taquito/signer");
const nft = require("./nft");
require('dotenv').config();


var io;
var gameSocket;
var gamesInSession = [];
var gameData = {};
var scores = {};
var sockets = {};

const initializeGame = (sio, socket) => {
  console.log("new socket added" + socket.id);
  io = sio;
  gameSocket = socket;

  gamesInSession.push(gameSocket);

  //  gameSocket.on("disconnect", onDisconnect);

  gameSocket.on("end", end);

  gameSocket.on("createNewGame", createNewGame);

  gameSocket.on("wantsToJoin", wantsToJoin);

  gameSocket.on("playerJoinsGame", playerJoinsGame);

  gameSocket.on("send data", sendData);
};

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

    sockets[gameSocket.id] = { gameID: idData.gameId, me: gameSocket.id, opponent: opp.me };

    sockets[opp.me].opponent = gameSocket.id;

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
  sockets[gameSocket.id] = { gameID: gameId, me: gameSocket.id, opponent: undefined };
  this.join(gameId);
  console.log("game data", gameData);
  console.log(sockets);
}

//  as game ends kisi ki bi
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
    if (scores[gameId].score1 > score) {
      metadata = await nft.nftFlow(scores[gameId].player1, address, gameData[gameId].betTokenName, gameData[gameId].amount);
      console.log(metadata);
      console.log(metadata.Ipfs);
      res = await reportWinner(gameId, scores[gameId].player1, metadata.Ipfs);
      console.log(res);
      if (res.success)
        io.to(gameId).emit("game over", scores[gameId].player1);
      else
        io.to(gameId).emit("issue");

    }
    else {
      metadata = await nft.nftFlow(address, scores[gameId].player1, gameData[gameId].betTokenName, gameData[gameId].amount);
      console.log(metadata);
      console.log(metadata.Ipfs);
      res = await reportWinner(gameId, address, metadata.Ipfs);
      console.log(res);
      if (res.success)
        io.to(gameId).emit("game over", address);
      else
        io.to(gameId).emit("issue");
    }

    delete scores[gameId];
    delete gameData[gameId];
    console.log(scores, gameData);

  }

}



function onDisconnect(gameSocket) {
  console.log(`person disconnect ${gameSocket.id}`);

  //  console.log(io.id);
  console.log(gameSocket);

  //  get socket se game room ka data ANIKET
  if (sockets[gameSocket.id] === undefined) {
    // do nothing let them leave
  }
  else {

    let me = sockets[gameSocket.id];

    if (me.opponent === undefined) {
      // yani opponent nahi mila aur mai bi chla gya
    }
    else {
      // call end of the one user
      // room = io.sockets.adapter.rooms.get(me.gameId)

      end(me.gameID, "User Disconnected", 0);
    }

  }


  // console.log(room);

  console.log(sockets);

  delete sockets[gameSocket.id];

  console.log(sockets);

  var i = gamesInSession.indexOf(gameSocket);
  gamesInSession.splice(i, 1);
}

function sendData(data) {
  console.log("sending data " + data);
  io.to(data.gameId).emit("send data", data);
}


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

    let batch = Tezos.wallet
      .batch()
      .withContractCall(teztrisInstance.methods.reportWinner(gameID, { "": char2Bytes.char2Bytes("ipfs://" + metadata) }, winner));

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


module.exports = { initializeGame, onDisconnect };
