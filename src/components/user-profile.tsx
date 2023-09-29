import { SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, Grid, Text, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "@context";
import { ChangeUserProfile } from "./change-user-profile";

export function UserProfile() {
  const { auth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex alignItems="center" p="2" h="100%">
        <Grid alignItems="center" justifyItems="center">
          <Avatar
            src={auth?.imagePath}
            w="5rem"
            h="5rem"
            gridRow="1"
            gridColumn="1"
          />
          <Avatar
            w="5rem"
            h="5rem"
            gridRow="1"
            gridColumn="1"
            background="transparent"
            color="transparent"
            icon={<SettingsIcon boxSize="8" />}
            zIndex="1"
            _hover={{
              color: "hsl(203.1, 25.5%, 90%)",
              backdropFilter: "blur(2px)",
            }}
            onClick={onOpen}
          />
        </Grid>
        <Box ml="3">
          <Text fontWeight="semibold" fontSize="3xl">
            {auth?.userName}
          </Text>
        </Box>
      </Flex>
      <ChangeUserProfile isOpen={isOpen} onClose={onClose} />
    </>
  );
}
