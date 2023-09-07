import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { Link as LinkRoute } from 'react-router-dom';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  type: "login" | "register";
}

export function FormLayout({ children, type }: Props) {
  return (

    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} w={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>
            {type === "login"
              ? "Sign in to your account"
              : "Sign up"
            }
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            {children}
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Text>
                  {type === "login"
                    ? "You don't have an account?"
                    : "You have an account?"
                  }
                </Text>
                <Link color={'blue.400'} as={LinkRoute} to={type === "login" ? `/register` : `/login`}>
                  {type === "login"
                    ? "Register"
                    : "Login"
                  }
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
