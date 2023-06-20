import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { User } from "../context/interfaces";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { nanoid } from "nanoid";

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
    <>
      {friends?.map((friend: User) => (
        <Flex key={nanoid()} alignItems='center' p='2' h='32' border='2px' borderColor='blue'>
          <Avatar src={friend.imagePath} size='xl' />
          <Box ml='3'>
            <Text fontWeight='normal' fontSize='3xl'>
              {friend.userName}
            </Text>
          </Box>
        </Flex>
      ))
      }
    </>
  )
}
