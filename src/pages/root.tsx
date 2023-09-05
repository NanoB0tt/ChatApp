/* import { Avatar, Box, Flex, Text } from "@chakra-ui/react"; */
/* import { useAuth } from "../context"; */

import { Container } from "@chakra-ui/react";
import { Sidebar } from "../components/sidebar";
import { Outlet } from "react-router-dom";


export function Root() {

  return (
    <Container p='unset' m='unset' maxW='unset' h='100vh' display='grid' gridTemplateColumns='25rem 1fr'>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </Container>
  )
}
