import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { router } from "./routes";
import { AuthProvider } from "./context";
import { FriendProvider } from "./context/friend-context";
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
