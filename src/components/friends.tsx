import { useEffect } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { User } from "../context/interfaces";
import { Box } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { Link as LinkRoute } from "react-router-dom";
import { FriendProfile } from "./friend-profile";
import { useFriends } from "../context/friend-context";

const REQUEST_MY_FRIENDS_URL = '/api/user/friend-request/me/friends'

export function Friends() {
  const axiosPrivate = useAxiosPrivate();
  const { friends, setFriends } = useFriends();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axiosPrivate.get(REQUEST_MY_FRIENDS_URL);
        setFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, [])

  return (
    <Box overflowY='scroll'>
      {friends?.map((friend: User) => (
        <LinkRoute to={`chat/${friend.id}`} key={nanoid()} >
          <FriendProfile friend={friend} ></FriendProfile>
        </LinkRoute>
      ))
      }
    </Box>
  )
}
