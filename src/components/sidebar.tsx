import { useEffect, useState } from "react";
import { UserProfile } from "./user-profile";
import { Friends } from "./friends";
import { SearchFriends } from "./search-friends";
import { FriendRequests } from "./friend-requests";
import { Box, Button, Grid } from "@chakra-ui/react";


export function Sidebar() {
  const [showFriendRequest, setShowFriendRequest] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    console.log(isSearching)
  }, [isSearching])

  return (
    <Box bg='tomato'>
      <UserProfile />
      <SearchFriends setIsSearching={setIsSearching} />
      <Grid templateColumns='1fr 1fr' gap='0.5rem' m='0.5rem'>
        <Button
          onClick={() => !isSearching && setShowFriendRequest(false)}
        >Friends</Button>
        <Button
          onClick={() => !isSearching && setShowFriendRequest(true)}
        >Invitations</Button>
      </Grid>
      {!isSearching &&
        !showFriendRequest
        ? <Friends />
        : <FriendRequests />
      }
    </Box>
  )
}
