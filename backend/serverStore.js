const connectedUsers = new Map();
let publicGames = [];
let privateGames = [];
let io = null;

const getMySocket = (wallet) => {
  // console.log(connectedUsers);
  return connectedUsers.get(wallet);
}

const addNewGame = (gameId, isPublic) => {
  if (isPublic) {
    publicGames.push(gameId);
  } else {
    privateGames.push(gameId);
  }
  // console.log(publicGames, privateGames);
}

const gameJoined = (gameId) => {
  publicGames.filter((id) => { id != gameId });
  privateGames.filter((id) => { id != gameId });
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
  connectedUsers.set(userId, socketId);
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
  }
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  setSocketServerInstance,
  getSocketServerInstance,
  getPublicRooms: getPublicGames,
  addNewGame, getAllGames, gameJoined, getMySocket
};
