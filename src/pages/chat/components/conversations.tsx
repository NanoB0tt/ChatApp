import { UnorderedList } from "@chakra-ui/react";

import { useAuth } from "@context/index";
import { nanoid } from "nanoid";

import { Messages } from "../helpers";

import { MessageBubbles } from "./message-bubbles";

export function Conversations({
  messages,
}: {
  messages: Messages[] | undefined;
}) {
  const { auth } = useAuth();

  return (
    <UnorderedList styleType="none" display="flex" flexDirection="column">
      {messages?.map((message) => {
        return (
          <MessageBubbles
            key={nanoid()}
            message={message}
            isMe={message.from !== auth?.id}
          />
        );
      })}
    </UnorderedList>
  );
}
