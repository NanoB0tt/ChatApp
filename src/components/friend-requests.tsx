import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";

import { useAuth, useFriends } from "@context/index";
import { FriendRequest } from "@context/interfaces";
import { nanoid } from "nanoid";

import {
  getFriendRequests,
  invitationRecieved,
  respondToFriendRequest,
} from "./helpers/friend-requests";
import { FriendProfile } from "./friend-profile";

export function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>();
  const { friends, setFriends } = useFriends();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getFriendRequests(setFriendRequests);
    invitationRecieved(friendRequests, setFriendRequests);
  }, []);

  return (
    <Box
      height="20rem"
      overflowY="scroll"
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
      {friendRequests?.map((request: FriendRequest) => {
        const friend = request.creator;
        return (
          <FriendProfile friend={friend} key={nanoid()}>
            <Flex gap="0.5rem">
              <Button
                borderRadius="full"
                width="1"
                onClick={() => {
                  respondToFriendRequest(friend.id, "accepted", auth, navigate);
                  setFriendRequests(
                    friendRequests.filter(
                      (req) => req.creator.id !== request.creator.id,
                    ),
                  );
                  friends && setFriends([...friends, friend]);
                }}
              >
                <CheckIcon />
              </Button>
              <Button
                borderRadius="full"
                width="1"
                onClick={() => {
                  respondToFriendRequest(friend.id, "rejected", auth, navigate);
                  setFriendRequests(
                    friendRequests.filter(
                      (req) => req.creator.id !== request.creator.id,
                    ),
                  );
                }}
              >
                <CloseIcon />
              </Button>
            </Flex>
          </FriendProfile>
        );
      })}
    </Box>
  );
}
