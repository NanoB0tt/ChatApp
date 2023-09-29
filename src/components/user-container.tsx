import { Flex } from "@chakra-ui/react";
import { UserProfile } from "./user-profile";
import UserSocial from "./user-social";

export default function UserContainer() {
  return (
    <Flex
      paddingX="2rem"
      justifyContent={{ base: "", lg: "space-between" }}
      alignItems={{ base: "center", lg: "normal" }}
      gap={{ base: "0.5rem", lg: "0rem" }}
    >
      <UserProfile />
      <UserSocial />
    </Flex>
  );
}
