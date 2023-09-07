import { RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { router } from './routes'
import { AuthProvider } from './context'
import { FriendProvider } from './context/friend-context'


export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <FriendProvider>
          <RouterProvider router={router} />
        </FriendProvider>
      </AuthProvider>
    </ChakraProvider>

  )
}
