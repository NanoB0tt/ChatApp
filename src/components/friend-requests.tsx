import { useEffect, useState } from "react";
import { FriendRequest } from "../context/interfaces";
import { Box, Button, Flex } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { FriendProfile } from "./friend-profile";
import { useFriends } from "../context/friend-context";
import socket from "../socket";
import { useAuth } from "../context";
import { nanoid } from "nanoid";

const RECEIVED_REQUEST_URL = '/api/user/friend-request/me/received-requests';
const RESPOND_FRIEND_REQUEST_URL = '/api/user/friend-request/response/'

export function FriendRequests() {
  const axiosPrivate = useAxiosPrivate();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>();
  const { friends, setFriends } = useFriends();
  const { auth } = useAuth();



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
    socket.on('invitationRecieved', (message) => {
      if (friendRequests) {
        setFriendRequests([...friendRequests as FriendRequest[], message]);
      }
      setFriendRequests([message]);
    })
  }, [])


  async function respondToFriendRequest(id: string, status: string) {
    const data = { status }
    try {
      await axiosPrivate.put(RESPOND_FRIEND_REQUEST_URL + id,
        JSON.stringify(data));
      if (status === 'accepted') {
        socket.emit('responseToRequest', auth);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      height='20rem'
      overflowY='scroll'
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'hsl(203.1, 25.5%, 90%)',
          borderRadius: '24px',
        },
      }}
    >
      {
        friendRequests?.map((request: FriendRequest) => {
          const friend = request.creator;
          return (
            <FriendProfile friend={friend} key={nanoid()}>
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
