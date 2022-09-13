// import { InMemorySigner} from '@taquito/signer';
// import { char2Bytes } from '@taquito/utils';
// import {TezosToolkit} from '@taquito/taquito'

const TezosToolkit = require("@taquito/taquito");
const char2Bytes = require("@taquito/utils");
const InMemorySigner = require("@taquito/signer");


 var io;
 var gameSocket;
 var gamesInSession = [];
 var gameData = {};
 var scores = {};

 const initializeGame = (sio, socket ) => {
   console.log("new socket added" + socket.id);
   io = sio;
   gameSocket = socket;
 
   gamesInSession.push(gameSocket);
 
   gameSocket.on("disconnect", onDisconnect);
 
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
 
     this.emit("match found" , gameData[gameId]);
 
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
 
     io.sockets.in(idData.gameId).emit("start game");
 
   } else {
     this.emit("status1", "There are already 2 people playing in this room.");
   }
 }
 
 
 
 
 function createNewGame(gameId , obj) {
  // Number(obj.amount),obj.betToken,obj.betTokenId,obj.betTokenType, 6 ,gameIdInput
   console.log("createNewGame " + gameId);
   gameData[gameId] = obj;
   this.join(gameId);
   console.log("game data",gameData);
 }
 
//  as game ends kisi ki bi
 async function end(gameId , address , score) {
  console.log(gameId , address , score);
  let res;
 
   if(scores[gameId] === undefined){
    // kisi ka nai khatam hua 
    scores[gameId] = {player1 : address , score1 : score};
    console.log(scores);
   }
   else{
    //  ek ka already khatam hogya
    if(scores[gameId].score1 > score){
      res = await reportWinner(gameId , scores[gameId].player1 , "" );
      console.log(res);
      if(res.success)
      io.to(gameId).emit("game over", scores[gameId].player1);
      else
      io.to(gameId).emit("issue");
      
    }
    else{
      res = await reportWinner(gameId , address , "");
      console.log(res);
      if(res.success)
      io.to(gameId).emit("game over", address);
      else
      io.to(gameId).emit("issue");
    }

    delete scores[gameId];
    delete gameData[gameId];
    console.log(scores,gameData);

   }

 }
 


 function onDisconnect() {
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

  try{
  const Tezos = new TezosToolkit.TezosToolkit("https://ghostnet.smartpy.io/");
  Tezos.setProvider({
      signer: new InMemorySigner.InMemorySigner('edskRyL3DyJr8HsJiVi9WSKtHfKPrbsSV7AMAoNYLV4ehMbWxRHYXCa6QmAfYAvL4x5BTBuYyLVBh1mJ9gC99dYbkMQXK4oup3'),
    });

    const teztrisInstance = await Tezos.contract.at("KT1KY1nnwawbqyXz2g2b9tS7qCaiEidnkZWb");

    let batch = Tezos.wallet
        .batch()
        .withContractCall(teztrisInstance.methods.reportWinner(gameID , {"" : char2Bytes.char2Bytes("ipfs://" + metadata)} , winner));
    
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
 
 exports.initializeGame = initializeGame;