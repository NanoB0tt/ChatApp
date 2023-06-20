/* import { Avatar, Box, Flex, Text } from "@chakra-ui/react"; */
/* import { useAuth } from "../context"; */

import { Container } from "@chakra-ui/react";
import { Sidebar } from "../components/sidebar";


export function Root() {

  return (
    <Container p='unset' m='unset' h='100vh'>
      <Sidebar />
    </Container>
  )
}
