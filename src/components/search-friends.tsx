import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "@context/interfaces";
import { Box, Button, Input } from "@chakra-ui/react";
import { FriendProfile } from "./friend-profile";
import { nanoid } from "nanoid";
import { searchFriends, sendFriendRequest } from "./helpers/search-friends";
import { useAuth } from "@context";
import { useDebounce } from "@customHooks";
import { useNavigate } from "react-router-dom";

interface Props {
  setSearching: Dispatch<SetStateAction<boolean>>;
}

export function SearchFriends({ setSearching }: Props) {
  const [search, setSearch] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const { auth } = useAuth();
  const debouncedValue = useDebounce(searchInput, 500);
  const navigate = useNavigate();

  useEffect(() => {
    searchFriends(debouncedValue, setSearch, setSearching, navigate);
  }, [debouncedValue]);

  return (
    <Box>
      <Input
        placeholder="Search..."
        onChange={(e) => setSearchInput(e.target.value)}
      ></Input>
      {search.length > 0 && (
        <Box
          height="20rem"
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
          {search.map((friend: User) => (
            <FriendProfile friend={friend} key={nanoid()}>
              <Button onClick={() => sendFriendRequest(friend.id, auth)}>
                Invite
              </Button>
            </FriendProfile>
          ))}
        </Box>
      )}
    </Box>
  );
}
