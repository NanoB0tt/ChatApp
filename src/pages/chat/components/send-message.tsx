import socket from "../../../socket";
import { Button, Flex, Input, FormControl } from "@chakra-ui/react";
import { axiosPrivate } from "../../../api/axios";
import { useForm } from "react-hook-form";
import { Messages } from "../helpers";
import { Dispatch, SetStateAction } from "react";
import { ADD_MESSAGE } from "../../../api/routes";
import { useNavigate } from "react-router-dom";

interface Props {
  messages: Messages[] | undefined;
  setMessages: Dispatch<SetStateAction<Messages[] | undefined>>;
  room: string | undefined;
}

export function SendMessage({ messages, setMessages, room }: Props) {
  const { register, handleSubmit } = useForm<{ message: string }>();
  const navigate = useNavigate();

  async function onSubmit({ message }: { message: string }) {
    try {
      const response = await axiosPrivate.post(ADD_MESSAGE, { message, room });
      const newMessage: Messages = response.data;
      if (messages) {
        setMessages([...messages, newMessage]);
      } else {
        setMessages([newMessage]);
      }
      socket.emit("sendMessage", {
        message: newMessage.message,
        createdAt: newMessage.createdAt,
        roomId: room,
      });
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl height={{ base: "100%" }}>
        <Flex
          alignSelf="end"
          alignItems={{ base: "flex-end", lg: "normal" }}
          gap={{ base: "0.3rem", lg: "0.7rem" }}
          width="100%"
          height="100%"
          p={{ base: "0 0.7rem", lg: "0 2rem" }}
        >
          <Input
            type="text"
            backgroundColor="hsl(213.3, 13.4%, 13.1%, 0.74)"
            outline="none"
            border="none"
            color="inherit"
            _focus={{
              outline: "none",
              border: "none",
            }}
            {...register("message")}
          />
          <Button
            type="submit"
            backgroundColor="hsl(213.3, 13.4%, 13.1%)"
            color="inherit"
            _hover={{
              backgroundColor: "none",
            }}
          >
            send
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
}
