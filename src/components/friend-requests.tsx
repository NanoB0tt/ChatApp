import { useEffect, useState } from "react";
import { FriendRequest } from "../context/interfaces";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const RECEIVED_REQUEST_URL = '/api/user/friend-request/me/received-requests';
const RESPOND_FRIEND_REQUEST_URL = '/api/user/friend-request/response/'

export function FriendRequests() {
  const axiosPrivate = useAxiosPrivate();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>();



  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const response = await axiosPrivate.get(RECEIVED_REQUEST_URL);
        setFriendRequests(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriendRequests();
  }, [])


  async function respondToFriendRequest(id: string, status: string) {
    const data = { status }
    try {
      await axiosPrivate.put(RESPOND_FRIEND_REQUEST_URL + id,
        JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {friendRequests?.map((request: FriendRequest) => (
        <Flex key={nanoid()} alignItems='center' p='2' h='32' border='2px' borderColor='violet'>
          <Avatar src={request?.creator.imagePath} size='xl' />
          <Box ml='3'>
            <Text fontWeight='normal' fontSize='3xl'>
              {request?.creator.userName}
            </Text>
          </Box>
          <Button
            borderRadius='full'
            width='1'
            onClick={() => {
              respondToFriendRequest(request.creator.id, 'accepted')
              setFriendRequests(friendRequests.filter(req => req.creator.id !== request.creator.id))
            }}
          >
            <CheckIcon />
          </Button>
          <Button
            borderRadius='full'
            width='1'
            onClick={() => {
              respondToFriendRequest(request.creator.id, 'rejected')
              setFriendRequests(friendRequests.filter(req => req.creator.id !== request.creator.id))
            }}
          >
            <CloseIcon />
          </Button>
        </Flex>
      ))}
    </>
  )
}
