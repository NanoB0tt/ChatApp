import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { User } from "@context/interfaces";
import { ReactNode } from "react";

interface Props {
  friend: User;
  isHeader?: boolean;
  isSelected?: boolean;
  children?: ReactNode;
}

export function FriendProfile({
  friend,
  isHeader,
  children,
  isSelected,
}: Props) {
  return (
    <Flex
      alignItems="center"
      justifySelf={isHeader ? "center" : ""}
      justifyContent={{ base: `${isHeader ? "center" : "space-between"}` }}
      gap="1rem"
      padding={{
        base: `${isHeader ? "0rem 2rem" : "2.5rem"}`,
        lg: `${isHeader ? "0rem 2rem" : "2.5rem"}`,
      }}
      height={isHeader ? "4.4rem" : "5rem"}
      width={{
        base: `${isHeader ? "100%" : ""}`,
        lg: `${isHeader ? "15rem" : ""}`,
      }}
      borderRadius={{
        base: `${isHeader ? "" : ""}`,
        lg: `${isHeader ? "20rem" : ""}`,
      }}
      backgroundColor={
        isHeader
          ? "hsl(213.3, 13.4%, 13.1%)"
          : isSelected
            ? "hsl(213.1, 19.5%, 29.2%)"
            : "inherit"
      }
      gridRow={isHeader ? "1/2" : ""}
      gridColumn={isHeader ? "1/2" : ""}
      zIndex={isHeader ? "100" : ""}
      _hover={{
        cursor: "pointer",
      }}
    >
      <Flex alignItems="center">
        <Avatar src={friend.imagePath} w="3rem" h="3rem" bg="gray.500" />
        <Box ml="3">
          <Text fontWeight="semibold" fontSize="1.3rem">
            {friend.userName}
          </Text>
        </Box>
      </Flex>
      {children}
    </Flex>
  );
}
