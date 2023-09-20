import { useEffect, useState } from "react";
import socket from "../../socket";
import { Box, Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { User } from "../../context/interfaces";
import { useAuth } from "../../context";
import { FriendProfile } from "../../components/friend-profile";
import { Messages, getAllMessages, getRoom, getUser } from "./helpers";
import { SendMessage } from "./components/send-message";
import { Conversations } from "./components/conversations";
import { useFriends } from "../../context/friend-context";


export function Chat() {
  const [messages, setMessages] = useState<Messages[]>();
  const [user, setUser] = useState<User>();
  const [room, setRoom] = useState<string>();
  const params = useParams() as { id: string };
  const { auth } = useAuth();
  const { setSelectedFriend } = useFriends();
  const isHeader = true;

  useEffect(() => {
    socket.on('privateMessage', (data) => {
      if (data.from !== auth?.id) {
        if (messages) {
          setMessages([...messages, data]);
        } else {
          setMessages([data]);
        }
      }
    });

  }, [messages])

  useEffect(() => {

    async function get() {
      setUser(await getUser(params));
      setRoom(await getRoom(params));
      setSelectedFriend(params.id);
      if (room) {
        setMessages(await getAllMessages(room));
      }
    }

    get();
  }, [params, room])

  return (
    <Container
      ml='0'
      mr='0'
      maxW='100vw'
      h='100vh'
      display='grid'
      gridTemplateRows='4.5rem 1fr 5rem'
      padding='0'
      backgroundImage='/waves2.svg'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      backdropBlur='sm'
    >
      {user &&
        <FriendProfile
          friend={user}
          isHeader={isHeader}
        >
        </FriendProfile>}
      <Box
        overflowY='scroll'
        padding='2rem 5rem 0.5rem'
        gridRow='1/3'
        gridColumn='1/2'
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
        <Conversations messages={messages} />
      </Box>
      <SendMessage messages={messages} setMessages={setMessages} room={room} />
    </Container>
  )
}

