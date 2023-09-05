import { useEffect, useState } from "react";
import socket from "../../socket";
import { nanoid } from "nanoid";
import { Box, Button, Container, Flex, Input, ListItem, UnorderedList } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { User } from "../../context/interfaces";
import { useAuth } from "../../context";
import { FriendProfile } from "../../components/friend-profile";

const REQUEST_USER = '/api/user/';
const REQUEST_ROOM = '/api/user/room/';
const ADD_MESSAGE = '/api/chat/addMessage';
const GET_MESSAGES = '/api/chat/getAllMessages/';

export function Chat() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ message: string, from: string }[]>();
  const [user, setUser] = useState<User>();
  const [room, setRoom] = useState<string>();
  const params = useParams() as { id: string };
  const { auth } = useAuth();
  const isHeader = true;

  async function getUser(params: { id: string }) {
    const response = await axiosPrivate.get(REQUEST_USER + params.id)
    const user = response.data;
    setUser(user);
  }

  async function getRoom(params: { id: string }) {
    const response = await axiosPrivate.get(REQUEST_ROOM + params.id)
    const room = response.data.room;
    socket.emit('joinRoom', room);
    setRoom(room);
  }

  async function sendMessage(message: string, room: string, from: string) {
    const newMessage = { message, from }
    try {
      await axiosPrivate.post(ADD_MESSAGE, { message, room })
    } catch (err) {
      console.log(err);
    }
    socket.emit('sendMessage', {
      message,
      to: room
    });
    if (messages) {
      setMessages([...messages, newMessage]);
    } else {
      setMessages([newMessage]);
    }
  }

  async function getAllMessages(room: string) {
    const response = await axiosPrivate.get(GET_MESSAGES + room);
    const messages = response.data.content;
    setMessages(messages);

  }

  useEffect(() => {
    if (room) {
      getAllMessages(room);
    }
  }, [room])


  useEffect(() => {
    socket.on('privateMessage', (data) => {
      if (data.from !== auth?.id && messages) {
        setMessages([...messages, data])
      }
    });
    console.log(messages);

  }, [messages])

  useEffect(() => {
    getUser(params);
    getRoom(params);
  }, [params])

  return (
    <>
      <Container ml='0' mr='0' maxW='100vw' h='100vh' display='grid' gridTemplateRows='4.5rem 1fr 5rem' padding='0'>
        {user && <FriendProfile friend={user} isHeader={isHeader}></FriendProfile>}
        <Box overflowY='scroll' padding='2rem 5rem 0.5rem'>
          <UnorderedList styleType='none' display='flex' flexDirection='column'>
            {
              messages?.map(message => {
                if (message.from === auth?.id) {
                  return (
                    <ListItem
                      alignSelf='flex-end'
                      key={nanoid()}
                      bg='blue.200'
                      padding='0.4rem 5rem 0.4rem 0.7rem'
                      borderRadius='xl'
                      mb='1'
                      mr='1.5rem'
                      position='relative'
                      _before={{
                        content: `''`,
                        bg: 'blue.200',
                        display: 'block',
                        width: '1.5rem',
                        height: '1rem',
                        position: 'absolute',
                        transform: 'skew(-40deg)',
                        right: '-2px',
                        top: '0px'
                      }}
                    >
                      {message.message}
                    </ListItem>
                  )
                } else {
                  return (
                    <ListItem
                      alignSelf='flex-start'
                      key={nanoid()}
                      bg='green.200'
                      padding='0.4rem 0.7rem 0.4rem 5rem'
                      borderRadius='xl'
                      mb='1'
                      ml='1.5rem'
                      position='relative'
                      _before={{
                        content: `''`,
                        bg: 'green.200',
                        display: 'block',
                        width: '1.5rem',
                        height: '1rem',
                        position: 'absolute',
                        transform: 'skew(40deg)',
                        left: '-2px',
                        top: '0px'
                      }}
                    >
                      {message.message}
                    </ListItem>
                  )

                }
              }
              )
            }
          </UnorderedList>
        </Box>
        <Flex alignSelf='start' paddingX='5rem'>
          <Input onChange={(e) => setMessage(e.target.value)} type="text"></Input>
          <Button onClick={() => sendMessage(message, room as string, auth?.id as string)}>send</Button>
        </Flex>
      </Container>
    </>
  )
}

