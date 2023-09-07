import { useEffect, useState } from "react";
import { FriendRequest } from "../context/interfaces";
import { Box, Button, Flex } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { FriendProfile } from "./friend-profile";
import { useFriends } from "../context/friend-context";

const RECEIVED_REQUEST_URL = '/api/user/friend-request/me/received-requests';
const RESPOND_FRIEND_REQUEST_URL = '/api/user/friend-request/response/'

export function FriendRequests() {
  const axiosPrivate = useAxiosPrivate();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>();
  const { friends, setFriends } = useFriends();



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
    <Box height='20rem' overflowY='scroll'>
      {
        friendRequests?.map((request: FriendRequest) => {
          const friend = request.creator;
          return (
            <FriendProfile friend={friend}>
              <Flex gap='0.5rem'>
                <Button
                  borderRadius='full'
                  width='1'
                  onClick={() => {
                    respondToFriendRequest(friend.id, 'accepted')
                    setFriendRequests(friendRequests.filter(req => req.creator.id !== request.creator.id))
                    friends && setFriends([...friends, friend])
                  }}
                >
                  <CheckIcon />
                </Button>
                <Button
                  borderRadius='full'
                  width='1'
                  onClick={() => {
                    respondToFriendRequest(friend.id, 'rejected')
                    setFriendRequests(friendRequests.filter(req => req.creator.id !== request.creator.id))
                  }}
                >
                  <CloseIcon />
                </Button>
              </Flex>
            </FriendProfile>
          )
        })
      }
    </Box>
  )
}
