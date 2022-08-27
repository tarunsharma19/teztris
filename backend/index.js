const chessGame = require("./tetris");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  tetris.initializeGame(io, socket);
});

http.listen(process.env.PORT || 3000, function () {
  console.log("listening on *:3000");
});