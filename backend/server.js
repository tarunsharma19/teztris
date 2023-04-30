const http = require('http');
const express = require('express');
const socketServer = require('./socketServer');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    res.send('Server started successfully');
});
app.use('/api', require('./routes'));

const server = http.createServer(app);
socketServer.registerSocketServer(server);

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected'.green.inverse)
        server.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`.yellow.inverse);
        });
    })
    .catch((err) => {
        console.log('database connection failed. Server not started');
        console.error(err);
    });
