import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import { SearchFriends } from "./search-friends";
import { FriendRequests } from "./friend-requests";
import { useState } from "react";

export default function UserSocial() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearching, setSearching] = useState(false);
  return (
    <>
      <Button
        onClick={onOpen}
        w="2.5rem"
        h="2.5rem"
        padding="0"
        borderRadius="full"
        marginTop="0.5rem"
      >
        <FaUserPlus />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Friends</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height="25rem">
              <SearchFriends setSearching={setSearching} />
              {!isSearching && <FriendRequests />}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
