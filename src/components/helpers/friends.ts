import { Dispatch } from "react";
import { axiosPrivate } from "../../api/axios";
import { User } from "../../context/interfaces";
import { REQUEST_MY_FRIENDS_URL } from "../../api/routes";
import socket from "../../socket";

export async function getFriends(setFriends: Dispatch<User[]>) {
  try {
    const response = await axiosPrivate.get(REQUEST_MY_FRIENDS_URL);
    setFriends(response.data);
  } catch (error) {
    console.log(error);
  }
}
export function addFriend(
  friends: User[] | null,
  setFriends: Dispatch<User[]>,
  auth: User | null,
) {
  socket.on("addFriend", (message) => {
    if (auth?.id !== message.id) {
      if (friends) {
        setFriends([...friends, message]);
      }
      setFriends([message]);
    }
  });
}
