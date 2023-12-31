import { createContext, useContext, useState } from "react";

import { FriendContextProps, FriendProviderProps, User } from "./interfaces";

const FriendContext = createContext<FriendContextProps | undefined>(undefined);

export function FriendProvider({ children }: FriendProviderProps) {
  const [friends, setFriends] = useState<User[] | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<string | undefined>();

  return (
    <FriendContext.Provider
      value={{ friends, setFriends, selectedFriend, setSelectedFriend }}
    >
      {children}
    </FriendContext.Provider>
  );
}

export function useFriends() {
  const context = useContext(FriendContext);
  if (context === undefined) {
    throw new Error("useFriends must be used within a FriendContext");
  }
  return context;
}
