import { Dispatch, SetStateAction } from "react";
import { axiosPrivate } from "@api/axios";
import {
  RECEIVED_REQUEST_URL,
  RESPOND_FRIEND_REQUEST_URL,
} from "@api/routes";
import { FriendRequest, User } from "@context/interfaces";
import socket from "@socket";
import { NavigateFunction } from "react-router-dom";

export async function getFriendRequests(
  setFriendRequests: Dispatch<SetStateAction<FriendRequest[] | undefined>>,
) {
  try {
    const response = await axiosPrivate.get(RECEIVED_REQUEST_URL);
    setFriendRequests(response.data);
  } catch (error) {
    console.log(error);
  }
}

export function invitationRecieved(
  friendRequests: FriendRequest[] | undefined,
  setFriendRequests: Dispatch<SetStateAction<FriendRequest[] | undefined>>,
) {
  socket.on("invitationRecieved", (message) => {
    if (friendRequests) {
      setFriendRequests([...(friendRequests as FriendRequest[]), message]);
    }
    setFriendRequests([message]);
  });
}

export async function respondToFriendRequest(
  id: string,
  status: string,
  auth: User | null,
  navigate: NavigateFunction,
) {
  const data = { status };
  try {
    await axiosPrivate.put(
      RESPOND_FRIEND_REQUEST_URL + id,
      JSON.stringify(data),
    );
    if (status === "accepted") {
      socket.emit("responseToRequest", auth);
    }
  } catch (error) {
    console.log(error);
    navigate("/login");
  }
}
