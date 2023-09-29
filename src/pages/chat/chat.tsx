import { useEffect, useState } from "react";
import socket from "@socket";
import { Box, Button, Container } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "@context/interfaces";
import { useAuth, useFriends } from "@context";
import { FriendProfile } from "@components";
import { Messages, getAllMessages, getRoom, getUser } from "./helpers";
import { SendMessage, Conversations } from "@chat/components";
import { AiFillHome } from "react-icons/ai";

export function Chat() {
  const [messages, setMessages] = useState<Messages[]>();
  const [user, setUser] = useState<User>();
  const [room, setRoom] = useState<string>();
  const params = useParams() as { id: string };
  const { auth } = useAuth();
  const { setSelectedFriend } = useFriends();
  const isHeader = true;
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("privateMessage", (data) => {
      if (data.from !== auth?.id) {
        if (messages) {
          setMessages([...messages, data]);
        } else {
          setMessages([data]);
        }
      }
    });
  }, [messages]);

  useEffect(() => {
    async function get() {
      const [user, newRoom, messages] = await Promise.all([
        getUser(params, navigate),
        getRoom(params),
        getAllMessages(room),
      ]);
      setUser(user);
      setRoom(newRoom);
      setSelectedFriend(params.id);
      setMessages(messages);
    }
    get();
  }, [params, room]);

  return (
    <Container
      ml="0"
      mr="0"
      maxW="100vw"
      h="100vh"
      display="grid"
      gridTemplateRows="4.5rem 1fr 3rem"
      padding="0"
      backgroundImage="/waves2.svg"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backdropBlur="sm"
    >
      {user && (
        <FriendProfile friend={user} isHeader={isHeader}>
          <Button
            borderRadius="full"
            display={{ base: "flex", lg: "none" }}
            padding="0rem"
            onClick={() => {
              setSelectedFriend(undefined);
              navigate("/");
            }}
          >
            <AiFillHome />
          </Button>
        </FriendProfile>
      )}
      <Box
        overflowY="scroll"
        padding={{ base: "2rem 1rem 0.5rem", lg: "2rem 5rem 0.5rem" }}
        gridRow={{ base: "2/3", lg: "1/3" }}
        gridColumn="1/2"
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "hsl(203.1, 25.5%, 90%)",
            borderRadius: "24px",
          },
        }}
      >
        <Conversations messages={messages} />
      </Box>
      <SendMessage messages={messages} setMessages={setMessages} room={room} />
    </Container>
  );
}
