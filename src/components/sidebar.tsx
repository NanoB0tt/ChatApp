import { Friends } from "./friends";
import { Box } from "@chakra-ui/react";
import UserContainer from "./user-container";


export function Sidebar() {

  return (
    <Box bg='tomato'>
      <UserContainer />
      <Friends />
    </Box>
  )
}
