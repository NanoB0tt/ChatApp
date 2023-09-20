import { Box, ListItem, Text } from "@chakra-ui/react";
import { Messages } from "../helpers";
interface Props {
  isMe: boolean;
  message: Messages;
}

export function MessageBubbles({ isMe, message }: Props) {
  return (
    <ListItem
      alignSelf={isMe ? 'flex-start' : 'flex-end'}
      display='grid'
      gridTemplateColumns={isMe ? '0.4rem 2rem 1fr' : '1fr 2rem 0.4rem'}
    >
      <Box
        gridRow='1/2'
        gridColumn={isMe ? '1/3' : '2/4'}
        bg={isMe ? 'hsl(213.3, 13.4%, 13.1%)' : 'hsl(213.1, 19.5%, 29.2%)'}
        height='1rem'
        transform={isMe ? 'skew(40deg)' : 'skew(-40deg)'}
      ></Box>
      <Box
        bg={isMe ? 'hsl(213.3, 13.4%, 13.1%)' : 'hsl(213.1, 19.5%, 29.2%)'}
        padding='0.4rem 0.4rem 0.4rem 0.7rem'
        borderRadius='xl'
        mb='1'
        gridRow='1/2'
        gridColumn={isMe ? '2/4' : '1/3'}
        zIndex='10'
        display='grid'
        gridTemplateColumns={isMe ? '3rem 1fr' : '1fr 3rem'}
        gridTemplateRows='auto 1rem'
      >
        <Text
          gridRow='span 2'
          alignSelf='center'
          maxW='18rem'
        >
          {message.message}</Text>
        <Text
          fontSize='0.8rem'
          justifySelf={isMe ? 'start' : 'end'}
          gridColumn={isMe ? '1/2' : '2/3'}
          gridRow='2/3'
        >
          {message.createdAt}</Text>
      </Box>
    </ListItem>
  )
}

