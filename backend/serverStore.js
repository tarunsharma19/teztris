const connectedUsers = new Map();
const gamesAvailable = new Map();

/*
connectedUsers ->

walletId : {
  sockets: [ socket ids ],
  game: gameId (uuid)
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

const addNewGame = (gameId, isPublic, gameCreatorId) => {
  if (isPublic) {
    publicGames.push(gameId);
  } else {
    privateGames.push(gameId);
  }

  gamesAvailable.set(gameId, [gameCreatorId]);
}

const removeGame = (gameId) => {
  publicGames = publicGames.filter((id) => { id != gameId });
  privateGames = privateGames.filter((id) => { id != gameId });
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
    gamesAvailable.set(gameId, [...gamesAvailable.get(gameId), opponentSocketId]);
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
  deleteGameIdfromGameMap
};
