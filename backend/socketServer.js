// server store
const serverStore = require('./serverStore');

// middleware
const authSocket = require('./socketHandlers/authSocket');

// handlers
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const createNewGameHandler = require('./socketHandlers/createNewGameHandler');
const wantsToJoinHandler = require('./socketHandlers/wantsToJoinHandler');
const playerJoinHandler = require("./socketHandlers/playerJoinHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const { endHandler } = require("./socketHandlers/endHandler");
const scoreEmittedHandler = require("./socketHandlers/scoreEmittedHandler");
const refundGameHandler = require("./socketHandlers/refundGameHandler");

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

        socket.on('wantsToJoin', (data) => {
            wantsToJoinHandler(socket, data);
        });

        socket.on('playerJoins', (data) => {
            playerJoinHandler(socket, data)
        })

        socket.on('scoreEmitted', (data) => {
            scoreEmittedHandler(socket, data);
        })

        socket.on('endGame', (data) => {
            endHandler(socket, data)
        })

        socket.on('refundGame', () => {
            refundGameHandler(socket);
        })

        socket.on('disconnect', () => {
            disconnectHandler(socket);
        });

    });

    setInterval(() => {
        emitPublicRooms();
    }, [1000 * 8]);
};

module.exports = {
    registerSocketServer,
};
