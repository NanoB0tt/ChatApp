import { useState } from "react";
import { UserProfile } from "./user-profile";
import { Friends } from "./friends";
import { SearchFriends } from "./search-friends";
import { FriendRequests } from "./friend-requests";
import { Box, Button, Grid } from "@chakra-ui/react";


export function Sidebar() {
  const [showFriendRequest, setShowFriendRequest] = useState(false);

  return (
    <Box bg='tomato' w='md' h='full'>
      <UserProfile />
      <Grid templateColumns='1fr 1fr'>
        <SearchFriends />
        <Button
          onClick={() => setShowFriendRequest(false)}
          gridColumn='1'
          gridRow='2'
        >boton 1</Button>
        <Button
          onClick={() => setShowFriendRequest(true)}
          gridColumn='2'
          gridRow='2'
        >boton 2</Button>
      </Grid>
      {!showFriendRequest
        ? <Friends />
        : <FriendRequests />
      }
    </Box>
  )
}
