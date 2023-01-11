const connectedUsers = new Map();

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

const addNewGame = (gameId, isPublic) => {
  if (isPublic) {
    publicGames.push(gameId);
  } else {
    privateGames.push(gameId);
  }
  // console.log(publicGames, privateGames);
}

const removeGame = (gameId) => {
  // console.log("publicGames", publicGames, "privateGames", privateGames)
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
  // console.log(connectedUsers);
};

const getConnectedUsers = () => {
  return connectedUsers;
};

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
};
