import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { User } from "../context/interfaces";
import { ReactNode } from "react";

interface Props {
  friend: User;
  isHeader?: boolean;
  isSelected?: boolean;
  children?: ReactNode;
}

export function FriendProfile({ friend, isHeader, children, isSelected }: Props) {
  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'
      justifySelf={isHeader ? 'center' : ''}
      p={isHeader ? '0rem 2rem' : '2.5rem'}
      h={isHeader ? '4.4rem' : '5rem'}
      borderRadius={isHeader ? '20rem' : ''}
      backgroundColor={isHeader ? 'hsl(213.3, 13.4%, 13.1%)' : isSelected ? 'hsl(213.1, 19.5%, 29.2%)' : 'inherit'}
      gridRow={isHeader ? '1/2' : ''}
      gridColumn={isHeader ? '1/2' : ''}
      zIndex={isHeader ? '100' : ''}
      _hover={{
        cursor: "pointer"
      }}>
      <Flex alignItems='center'>
        <Avatar src={friend.imagePath} w='3rem' h='3rem' />
        <Box ml='3'>
          <Text fontWeight='semibold' fontSize='1.3rem'>
            {friend.userName}
          </Text>
        </Box>
      </Flex>
      {children}
    </Flex>
  )
}
