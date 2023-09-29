import { UnorderedList } from "@chakra-ui/react";
import { Messages } from "../helpers";
import { useAuth } from "../../../context";
import { MessageBubbles } from "./message-bubbles";
import { nanoid } from "nanoid";

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
