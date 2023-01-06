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

    const emitPublicRooms = () => {
        const publicRooms = serverStore.getPublicRooms();
        io.emit('public-rooms', { publicRooms });
    };

    serverStore.setSocketServerInstance(io);

    io.on('connection', (socket) => {
        newConnectionHandler(socket, io);

        socket.on('createNewGame', (data) => {
            createNewGameHandler(socket, data);
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`);
            serverStore.removeConnectedUser(socket.id);
        });

    });

    setInterval(() => {
        emitPublicRooms();
    }, [1000 * 8]);

};

module.exports = {
    registerSocketServer,
};
