import { io } from "socket.io-client";

import { BASE_URL } from "../api/routes";

const socket = io(BASE_URL, { autoConnect: false });

// only for debugging
// socket.onAny((event, ...args) => {
//  console.log(event, args);
// });

export default socket;
