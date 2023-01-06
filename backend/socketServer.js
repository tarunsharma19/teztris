const authSocket = require('./socketHandlers/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const createNewGameHandler = require('./socketHandlers/createNewGameHandler');

const serverStore = require('./serverStore');

const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.use((socket, next) => {
        authSocket(socket, next);
    });

    serverStore.setSocketServerInstance(io);

    io.on('connection', (socket) => {
        newConnectionHandler(socket, io);

        socket.on('createNewGame', (data) => {
            createNewGameHandler(socket, data);
        });

    });

};

module.exports = {
    registerSocketServer,
};
