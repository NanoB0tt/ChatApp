import { RouterProvider } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider, FriendProvider } from "@context/index";

import { router } from "./routes";
import { theme } from "./theme.breakpoints";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <FriendProvider>
          <RouterProvider router={router} />
        </FriendProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
