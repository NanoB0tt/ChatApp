import { useEffect } from "react";
import { Link as LinkRoute } from "react-router-dom";

import { Box } from "@chakra-ui/react";

import { useAuth, useFriends } from "@context/index";
import { User } from "@context/interfaces";
import { nanoid } from "nanoid";

import { addFriend, getFriends } from "./helpers/friends";
import { FriendProfile } from "./friend-profile";

export function Friends() {
  const { friends, setFriends } = useFriends();
  const { auth } = useAuth();
  const { selectedFriend } = useFriends();

  useEffect(() => {
    getFriends(setFriends);
    addFriend(friends, setFriends, auth);
  }, []);

  return (
    <Box
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "hsl(203.1, 25.5%, 90%)",
          borderRadius: "24px",
        },
      }}
    >
      {friends?.map((friend: User) => (
        <LinkRoute to={`chat/${friend.id}`} key={nanoid()}>
          <FriendProfile
            friend={friend}
            isSelected={friend.id === selectedFriend}
          ></FriendProfile>
        </LinkRoute>
      ))}
    </Box>
  );
}
