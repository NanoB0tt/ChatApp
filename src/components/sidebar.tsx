import { Box } from "@chakra-ui/react";

import { useFriends } from "@context/index";

import { Friends } from "./friends";
import { UserContainer } from "./user-container";

export function Sidebar() {
  const { selectedFriend } = useFriends();

  return (
    <Box
      bg="hsl(213.3, 13.4%, 13.1%)"
      height="100vh"
      display={{
        base: `${selectedFriend !== undefined ? "none" : "block"}`,
        lg: "grid",
      }}
      gridTemplateRows="7rem auto"
    >
      <UserContainer />
      <Friends />
    </Box>
  );
}
