import { io } from "socket.io-client";
import { BASE_URL } from "./api/axios";

const socket = io(BASE_URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
})

export default socket;
