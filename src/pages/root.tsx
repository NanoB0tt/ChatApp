import { Container } from "@chakra-ui/react";
import { Sidebar } from "../components/sidebar";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <Container
      p="unset"
      m="unset"
      maxW="unset"
      h="100vh"
      display={{ base: "block", lg: "grid" }}
      gridTemplateColumns="25rem 1fr"
      color="hsl(203.1, 25.5%, 90%)"
    >
      <Sidebar />
      <Outlet />
    </Container>
  );
}
