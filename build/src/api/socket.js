import io from "socket.io-client";

// const URL = "https://teztris-backend.herokuapp.com/";

const URL = "localhost:3000";

const socket = io(URL, { transports: ["websocket"] });

// register preliminary event listeners here:

export { socket };