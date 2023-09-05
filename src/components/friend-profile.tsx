import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { User } from "../context/interfaces";

interface Props {
  friend: User;
  isHeader?: boolean;
  isFriendRequest?: boolean
  sendFriendRequest: (id: string) => Promise<void>
}

export function FriendProfile({ friend, isHeader, isFriendRequest, sendFriendRequest }: Props) {
  return (
    <Flex alignItems='center' p='2' h={isHeader ? '4.4rem' : '5rem'} border='2px' borderColor='blue' _hover={{
      cursor: "pointer"
    }}>
      <Avatar src={friend.imagePath} w='3rem' h='3rem' />
      <Box ml='3'>
        <Text fontWeight='normal' fontSize='1.3rem'>
          {friend.userName}
        </Text>
      </Box>
      {isFriendRequest && <Button onClick={() => sendFriendRequest(friend.id)}>Invite</Button>}
    </Flex>
  )
}
