import io from "socket.io-client";

export const URL = process.env.REACT_APP_SOCKET_URL;


// export const URL = "http://localhost:8080";

export const connectSocket = (address) => {
  const headers = { auth: address };
  console.log("Connecting to socket URL: ", URL)
  const socket = io(URL, { transportOptions: { polling: { extraHeaders: headers } } });

  console.log(socket);

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  return socket;
}



// console.log(socket)

// register preliminary event listeners here:

// export { socket };
