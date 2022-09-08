import io from "socket.io-client";

 const URL = "https://teztris-backend.herokuapp.com/";

// const URL = "https://teztris.azurewebsites.net:3000";

//const URL = "http://20.204.28.110:8080";

// const URL = "localhost:8080";

const socket = io(URL, { transports: ["websocket"] });

// register preliminary event listeners here:

export { socket };
