import { RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { router } from './routes'
import { AuthProvider } from './context'


export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>

  )
}
