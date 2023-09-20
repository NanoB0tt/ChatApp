import { axiosPrivate } from "../../api/axios";
import socket from "../../socket";
import { User } from "../../context/interfaces";

const REQUEST_USER = '/api/user/';
const REQUEST_ROOM = '/api/user/room/';
const GET_MESSAGES = '/api/chat/getAllMessages/';

export interface Messages {
  message: string;
  from: string;
  createdAt: string;
}

export async function getUser(params: { id: string }): Promise<User> {
  const response = await axiosPrivate.get(REQUEST_USER + params.id)
  return response.data;
}

export async function getRoom(params: { id: string }): Promise<string> {
  const response = await axiosPrivate.get(REQUEST_ROOM + params.id);
  const roomData = response.data.room;
  socket.emit('joinRoom', roomData);
  return roomData;
}

export async function getAllMessages(room: string): Promise<Messages[]> {
  const response = await axiosPrivate.get(GET_MESSAGES + room);
  return response.data;
}

