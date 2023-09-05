import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../context/interfaces";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { Box, Input } from "@chakra-ui/react";
import { FriendProfile } from "./friend-profile";

const SEARCH_FRIENDS_URL = '/api/user/search/friend/';
const SEND_FRIEND_REQUEST_URL = '/api/user/friend-request/send/'

interface Props {
  setIsSearching: Dispatch<SetStateAction<boolean>>
}

export function SearchFriends({ setIsSearching }: Props) {
  const axiosPrivate = useAxiosPrivate();
  const [searchFriends, setSearchFriends] = useState<User[]>();
  const [searchInput, setSearchInput] = useState('');
  const isFriendRequest = true;


  useEffect(() => {
    const searchFriends = async () => {
      try {
        if (searchInput.length >= 3) {
          const response = await axiosPrivate.get(SEARCH_FRIENDS_URL + searchInput);
          setSearchFriends(response.data)
          setIsSearching(true)
        } else if (searchInput.length < 3) {
          setSearchFriends([])
          setIsSearching(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
    searchFriends();
  }, [searchInput])


  async function sendFriendRequest(id: string) {
    try {
      await axiosPrivate.post(SEND_FRIEND_REQUEST_URL + id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box m='0.5rem 0.5rem 0rem'>
        <Input
          placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)}
        ></Input>
      </Box>
      {searchFriends?.map((friend: User) => (
        <FriendProfile friend={friend} isFriendRequest={isFriendRequest} sendFriendRequest={sendFriendRequest}></FriendProfile>
      ))}
    </>
  )
}
