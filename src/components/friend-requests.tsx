import { useEffect, useState } from "react";
import { FriendRequest } from "../context/interfaces";
import { Box, Button, Flex } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { FriendProfile } from "./friend-profile";
import { useFriends } from "../context/friend-context";
import { useAuth } from "../context";
import { nanoid } from "nanoid";
import {
  getFriendRequests,
  invitationRecieved,
  respondToFriendRequest,
} from "./helpers/friend-requests";
import { useNavigate } from "react-router-dom";

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
