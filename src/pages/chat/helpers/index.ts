import { NavigateFunction } from "react-router-dom";

import { axiosPrivate } from "@api/axios";
import { GET_MESSAGES, REQUEST_ROOM, REQUEST_USER } from "@api/routes";
import socket from "@socket";

export interface Messages {
  message: string;
  from: string;
  createdAt: string;
}

export async function getUser(
  params: { id: string },
  navigate: NavigateFunction,
) {
  try {
    const response = await axiosPrivate.get(REQUEST_USER + params.id);
    return response.data;
  } catch (err) {
    // console.log(err); TODO: handle this error
    navigate("/login");
  }
}

export async function getRoom(params: { id: string }) {
  try {
    const response = await axiosPrivate.get(REQUEST_ROOM + params.id);
    const roomData = response.data.room;
    socket.emit("joinRoom", roomData);
    return roomData;
  } catch (err) {
    // console.log(err); TODO: handle this error
  }
}

export async function getAllMessages(room: string | undefined) {
  if (room) {
    try {
      const response = await axiosPrivate.get(GET_MESSAGES + room);
      return response.data;
    } catch (err) {
      // console.log(err); TODO: handle this error
    }
  }
}
