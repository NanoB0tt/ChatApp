import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { User } from "../context/interfaces";
import { Box } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { Link as LinkRoute } from "react-router-dom";
import { FriendProfile } from "./friend-profile";

const REQUEST_MY_FRIENDS_URL = '/api/user/friend-request/me/friends'

export function Friends() {
  const axiosPrivate = useAxiosPrivate();
  const [friends, setFriends] = useState<User[]>();

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
    <Box>
      {friends?.map((friend: User) => (
        <LinkRoute to={`chat/${friend.id}`} key={nanoid()} >
          <FriendProfile friend={friend} ></FriendProfile>
        </LinkRoute>
      ))
      }
    </Box>
  )
}
