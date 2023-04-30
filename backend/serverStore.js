const colors = require('colors');

const connectedUsers = new Map();
/*
connectedUsers -> 

walletId : {
  sockets: [ socket ids ],
  game: gameId (uuid)
}

*/

const gamesAvailable = new Map();
/*
gamesAvailable ->

gameId : {
  me: socketId,
  opponent: socketId
}

*/

let publicGames = [];
let privateGames = [];
let io = null;

const getMySocket = (wallet) => {
  if (connectedUsers.has(wallet)) {
    return connectedUsers.get(wallet).sockets;
  }
}

const addNewGame = (gameId, isPublic, socket, alias, tokenData) => {
  // 1) Check if game is already added as it could be an old game and a multiple socket connection request
  if (gamesAvailable.has(gameId)) {
    return false;
  }

  if (isPublic) {
    publicGames.push({ gameId, alias, tokenData });
  } else {
    privateGames.push({ gameId, alias, tokenData });
  }
  console.log(publicGames);
  connectedUsers.set(socket.wallet, { ...connectedUsers.get(socket.wallet), game: gameId });
  // console.log(connectedUsers)
  // Set game available map
  gamesAvailable.set(gameId, { me: socket.id });
  // console.log(gamesAvailable)

  console.log('A game is added to the server memory . These are latest memory variables. '.green);
  console.log('Connected Users map'.yellow);
  console.log(connectedUsers);
  console.log('Games Available map'.yellow);
  console.log(gamesAvailable);
  console.log('-----------------------------------------------------------------'.yellow);

  return true;
}

const removeGame = (gameId) => {
  console.log(`Trying to remove this game id - ${gameId}`.yellow);

  publicGames = publicGames.filter((game) => {
    console.log(game);
    return game.gameId !== gameId
  });
  privateGames = privateGames.filter((game) => {
    return game.gameId !== gameId
  });
  console.log(`Updated public games`.yellow);
  console.log(publicGames);
  console.log(`Updated private games`.yellow);
  console.log(privateGames);
}

const setGameInUser = (wallet, gameId) => {
  connectedUsers.set(wallet, { ...connectedUsers.get(wallet), game: gameId });
}

const removeGameInUser = (wallet) => {
  connectedUsers.set(wallet, { sockets: connectedUsers.get(wallet).sockets });
}

const getAllGames = () => {
  return [...publicGames, ...privateGames];
}

const getGameMap = (gameId) => {
  if (gamesAvailable.has(gameId)) {
    return gamesAvailable.get(gameId);
  }
  return [];
}

const addOpponentToGameMap = (gameId, opponentSocketId) => {
  if (gamesAvailable.has(gameId)) {
    gamesAvailable.set(gameId, { ...gamesAvailable.get(gameId), opponent: opponentSocketId });
  }
}

const getPublicGames = () => {
  return publicGames;
};

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  if (connectedUsers.has(userId)) {
    connectedUsers.get(userId).sockets.push(socketId);
  } else {
    connectedUsers.set(userId, { sockets: [socketId] });
  }

  console.log(`Updated Connected Users Map: New User Added - (socketId) ${socketId} - (wallet) ${userId}.  Latest map as follows`.cyan);
  console.log(connectedUsers)
  console.log('-----------------------------------------------------------------');
};

const getConnectedUsers = () => {
  return connectedUsers;
};

const deleteGameIdfromGameMap = (gameId) => {
  if (gamesAvailable.has(gameId)) {
    gamesAvailable.delete(gameId);
  }
  // console.log(gamesAvailable)
}

const getGamesAvailable = () => {
  return gamesAvailable;
}

module.exports = {
  addNewGame,
  getAllGames,
  removeGame,
  setGameInUser,
  removeGameInUser,
  getMySocket,
  getPublicRooms: getPublicGames,
  setSocketServerInstance,
  getSocketServerInstance,
  addNewConnectedUser,
  getConnectedUsers,
  getGameMap,
  addOpponentToGameMap,
  deleteGameIdfromGameMap,
  getGamesAvailable
};
