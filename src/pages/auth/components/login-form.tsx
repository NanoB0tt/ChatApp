import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";
import { User } from "../../../context/interfaces";
import socket from "../../../socket";
import { useState } from 'react';
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { notification } from "./notify";
import { Toaster } from "react-hot-toast";

const LOGIN_URL = '/api/auth/login';

export function LoginForm() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [errEmail, setErrEmail] = useState(false);
  const [errPass, setErrPass] = useState(false);

  const { register, handleSubmit } = useForm();

  async function onSubmit(data: any): Promise<void> {
    try {
      const res = await axiosPrivate.post<User>(LOGIN_URL,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if (res.status === 201) {
        const user = res.data;
        setAuth(user);
        socket.auth = { id: user.id }
        socket.connect();
        notification('login')
        setTimeout(() => {
          navigate("/",);
        }, 2000);

      }
    } catch (err: any) {
      const errMsg = err.response.data.message;
      if (errMsg.includes('email')) {
        setErrEmail(true);
        setErrPass(false);
      } else if (errMsg.includes('password')) {
        setErrPass(true);
        setErrEmail(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errEmail}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="text"
          {...register("email")}
        />
        {errEmail && <FormErrorMessage>Incorrect Email</FormErrorMessage>}
      </FormControl>
      <FormControl isRequired isInvalid={errPass}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          {...register("password")}
        />
        {errPass && <FormErrorMessage>Incorrect Password</FormErrorMessage>}
      </FormControl>
      <Stack spacing={10} pt={2}>
        <Button
          loadingText="Submitting"
          size="lg"
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
          type='submit'
        >
          Sign in
        </Button>
      </Stack>
      <Toaster />
    </form>
  )
}
