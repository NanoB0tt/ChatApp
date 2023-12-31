import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

import { axiosPrivate } from "@api/axios";
import { SEARCH_FRIENDS_URL, SEND_FRIEND_REQUEST_URL } from "@api/routes";
import { User } from "@context/interfaces";
import socket from "@socket";

export async function searchFriends(
  searchValue: string,
  setSearch: Dispatch<SetStateAction<User[]>>,
  setSearching: Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction,
) {
  const request = SEARCH_FRIENDS_URL + searchValue;
  try {
    if (searchValue.length >= 3) {
      const response = await axiosPrivate.get(request);
      setSearch(response.data);
      setSearching(true);
    } else if (searchValue.length < 3) {
      setSearch([]);
      setSearching(false);
    }
  } catch (error) {
    // console.log(err); TODO: handle this error
    navigate("/login");
  }
}

export async function sendFriendRequest(id: string, auth: User | null) {
  try {
    const response = await axiosPrivate.post(SEND_FRIEND_REQUEST_URL + id);
    if (Object.keys(response.data).includes("error")) {
      notifyError(response.data.error);
    }
    socket.emit("invitationSend", auth);
  } catch (error) {
    // console.log(err); TODO: handle this error
  }
}

function notifyError(error: string) {
  toast.error(`${error}`, { duration: 2000 });
}
