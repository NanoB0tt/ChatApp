import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

import { LOGIN_URL } from "@api/routes";
import { useAuth } from "@context/index";
import { User } from "@context/interfaces";
import { useAxiosPrivate } from "@customHooks";
import socket from "@socket";
import { AxiosError } from "axios";

import { notification } from "../helpers/notify";
import { LoginInput } from "../interfaces/interfaces";

export function LoginForm() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [errEmail, setErrEmail] = useState(false);
  const [errPass, setErrPass] = useState(false);

  const { register, handleSubmit } = useForm<LoginInput>();

  async function onSubmit(data: LoginInput): Promise<void> {
    try {
      const res = await axiosPrivate.post<User>(
        LOGIN_URL,
        JSON.stringify(data),
      );
      if (res.status === 201) {
        const user = res.data;
        setAuth(user);
        socket.auth = { id: user.id };
        socket.connect();
        notification("login");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const errMsg = err.response?.data.message;
        if (errMsg.includes("email")) {
          setErrEmail(true);
          setErrPass(false);
        } else if (errMsg.includes("password")) {
          setErrPass(true);
          setErrEmail(false);
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errEmail}>
        <FormLabel>Email address</FormLabel>
        <Input type="text" {...register("email")} />
        {errEmail && <FormErrorMessage>Incorrect Email</FormErrorMessage>}
      </FormControl>
      <FormControl isRequired isInvalid={errPass}>
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("password")} />
        {errPass && <FormErrorMessage>Incorrect Password</FormErrorMessage>}
      </FormControl>
      <Stack spacing={10} pt={2}>
        <Button
          loadingText="Submitting"
          size="lg"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          type="submit"
        >
          Sign in
        </Button>
      </Stack>
      <Toaster />
    </form>
  );
}
