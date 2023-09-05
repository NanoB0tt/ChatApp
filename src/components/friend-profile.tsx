import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { User } from "../context/interfaces";
import { ReactNode } from "react";

interface Props {
  friend: User;
  isHeader?: boolean;
  children?: ReactNode;
}

export function FriendProfile({ friend, isHeader, children }: Props) {
  return (
    <Flex alignItems='center' p='2' h={isHeader ? '4.4rem' : '5rem'} border='2px' borderColor='blue' _hover={{
      cursor: "pointer"
    }}>
      <Flex alignItems='center'>
        <Avatar src={friend.imagePath} w='3rem' h='3rem' />
        <Box ml='3'>
          <Text fontWeight='normal' fontSize='1.3rem'>
            {friend.userName}
          </Text>
        </Box>
      </Flex>
      {children}
    </Flex>
  )
}
