import io from "socket.io-client";

//  const URL = "https://teztris-backend.herokuapp.com/";


// const URL = "http://20.204.28.110:8080";

const URL = `/api`;


// const URL = "http://teztris.centralindia.cloudapp.azure.com:8080";

// const URL = "https://minfy.live";

// const URL = "localhost:8080";

const socket = io(URL, { transports: ["websocket"] });

// register preliminary event listeners here:

export { socket };
