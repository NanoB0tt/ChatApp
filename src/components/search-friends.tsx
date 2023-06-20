import { useEffect, useState } from "react";
import { User } from "../context/interfaces";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { Avatar, Box, Button, Flex, Text, Input } from "@chakra-ui/react";
import { nanoid } from "nanoid";

const SEARCH_FRIENDS_URL = '/api/user/search/friend/';
const SEND_FRIEND_REQUEST_URL = '/api/user/friend-request/send/'

export function SearchFriends() {
  const axiosPrivate = useAxiosPrivate();
  const [searchFriends, setSearchFriends] = useState<User[]>();
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    const searchFriends = async () => {
      try {
        if (searchInput.length >= 3) {
          const response = await axiosPrivate.get(SEARCH_FRIENDS_URL + searchInput);
          setSearchFriends(response.data)
        } else if (searchInput.length < 3) {
          setSearchFriends([])
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
      <Input
        placeholder="voy a ser una busqueda" onChange={(e) => setSearchInput(e.target.value)}
        gridColumn='span 2'
      ></Input>
      {searchFriends?.map((friend: User) => (
        <Flex key={nanoid()} alignItems='center' p='2' h='32' border='2px' borderColor='violet'>
          <Avatar src={friend.imagePath} size='xl' />
          <Box ml='3'>
            <Text fontWeight='normal' fontSize='3xl'>
              {friend.userName}
            </Text>
          </Box>
          <Button onClick={() => sendFriendRequest(friend.id)}>boton 1</Button>
        </Flex>
      ))}
    </>
  )
}
