
import socket from "../../../socket";
import { Button, Flex, Input, FormControl, border } from "@chakra-ui/react";
import { axiosPrivate } from "../../../api/axios";
import { useForm } from "react-hook-form";
import { Messages } from "../helpers";
import { Dispatch, SetStateAction } from "react";

const ADD_MESSAGE = '/api/chat/addMessage';

interface Props {
  messages: Messages[] | undefined,
  setMessages: Dispatch<SetStateAction<Messages[] | undefined>>,
  room: string | undefined
}

export function SendMessage({ messages, setMessages, room }: Props) {
  const { register, handleSubmit } = useForm<{ message: string }>();

  async function onSubmit({ message }: { message: string }) {
    try {
      const response = await axiosPrivate.post(ADD_MESSAGE, { message, room })
      const newMessage: Messages = response.data
      if (messages) {
        setMessages([...messages, newMessage]);
      } else {
        setMessages([newMessage]);
      }
      socket.emit('sendMessage', {
        message: newMessage.message,
        createdAt: newMessage.createdAt,
        roomId: room
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Flex alignSelf='start' paddingX='5rem' gap='0.7rem'>
          <Input
            type="text"
            backgroundColor='hsl(213.3, 13.4%, 13.1%, 0.74)'
            outline='none'
            border='none'
            color='inherit'
            _focus={{
              outline: 'none',
              border: 'none'
            }}
            {...register("message")}
          />
          <Button
            type="submit"
            backgroundColor='hsl(213.3, 13.4%, 13.1%)'
            color='inherit'
            _hover={{
              backgroundColor: 'none'
            }}
          >send</Button>
        </Flex>
      </FormControl>
    </form>
  )
}

