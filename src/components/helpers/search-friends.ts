import { Dispatch, SetStateAction } from "react";
import { axiosPrivate } from "../../api/axios";
import socket from "../../socket";
import { User } from "../../context/interfaces";
import { SEARCH_FRIENDS_URL, SEND_FRIEND_REQUEST_URL } from "../../api/routes";
import { NavigateFunction } from "react-router-dom";

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
    console.log(error);
    navigate("/login");
  }
}

export async function sendFriendRequest(id: string, auth: User | null) {
  try {
    await axiosPrivate.post(SEND_FRIEND_REQUEST_URL + id);
    socket.emit("invitationSend", auth);
  } catch (error) {
    console.log(error);
  }
}
