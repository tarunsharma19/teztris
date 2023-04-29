import io from "socket.io-client";

export const URL = "https://backend.teztris.xyz";
// export const URL = "http://localhost:8080";

export const connectSocket = (address) => {
  const headers = { auth: address };
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
