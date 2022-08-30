
 var io;
 var gameSocket;
 var gamesInSession = [];
 var gameData = {};
 
//  obj= {amount :  , token: ,  }
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
 
     io.sockets.in(idData.gameId).emit("start game", idData.address);
 
   } else {
     this.emit("status1", "There are already 2 people playing in this room.");
   }
 }
 
 
 
 
 function createNewGame(gameId , obj) {

   console.log("createNewGame " + gameId);
   gameData[gameId] = {amount : obj.amount , tokenAdd : obj.tokenAdd , tokenType : obj.tokenType , tokenId : obj.tokenId};
   this.join(gameId);
   console.log(gameData);
 }
 
//  as game ends kisi ki bi
 function end(address) {
 
   console.log("address: " + address);


   io.to(gameId).emit("game over", address);
 }
 


 function onDisconnect() {
   var i = gamesInSession.indexOf(gameSocket);
   gamesInSession.splice(i, 1);
 }
 
 function sendData(data) {
   console.log("sending data " + data);
   io.to(data.gameId).emit("send data", data);
 }
 
 exports.initializeGame = initializeGame;