import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../context/interfaces";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { Box, Button, Input } from "@chakra-ui/react";
import { FriendProfile } from "./friend-profile";

const SEARCH_FRIENDS_URL = '/api/user/search/friend/';
const SEND_FRIEND_REQUEST_URL = '/api/user/friend-request/send/'

interface Props {
  setSearching: Dispatch<SetStateAction<boolean>>
}

export function SearchFriends({ setSearching }: Props) {
  const axiosPrivate = useAxiosPrivate();
  const [searchFriends, setSearchFriends] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    const searchFriends = async () => {
      try {
        if (searchInput.length >= 3) {
          const response = await axiosPrivate.get(SEARCH_FRIENDS_URL + searchInput);
          setSearchFriends(response.data);
          setSearching(true);
        } else if (searchInput.length < 3) {
          setSearchFriends([]);
          setSearching(false);
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
    <Box>
      <Input
        placeholder="Search..."
        onChange={(e) => setSearchInput(e.target.value)}
      ></Input>
      {searchFriends.length > 0 && (
        <Box height='20rem' overflowY='scroll'>
          {searchFriends.map((friend: User) => (
            <FriendProfile friend={friend}>
              <Button onClick={() => sendFriendRequest(friend.id)}>Invite</Button>
            </FriendProfile>
          ))}
        </Box>
      )}
    </Box>
  )
}
