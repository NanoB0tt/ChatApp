import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "@customHooks";
import { useState } from "react";
import { notification } from "./helpers/notify";
import { REGISTER_URL } from "@api/routes";

export function RegisterForm() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [alreadyExist, setAlreadyExist] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any): Promise<void> {
    try {
      const res = await axiosPrivate.post(REGISTER_URL, JSON.stringify(data));
      if (res.status === 201) {
        setAlreadyExist(false);
        notification("register");
        setTimeout(() => {
          navigate("/login/");
        }, 2000);
      }
    } catch (err: any) {
      if (err.response.data.message.includes("already exists")) {
        setAlreadyExist(true);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={!!errors.userName}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          {...register("userName", { maxLength: 20, minLength: 3 })}
        />
        {errors.userName && (
          <FormErrorMessage>
            Username must be between 3 and 20 characters in length.
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.email || alreadyExist}>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="text"
          {...register("email", {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email && (
          <FormErrorMessage>
            Invalid email format. Please enter a valid email address.
          </FormErrorMessage>
        )}
        {alreadyExist && (
          <FormErrorMessage>This email already exists</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          {...register("password", {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
          })}
        />
        {errors.password && (
          <FormErrorMessage>
            Password must contain at least one digit, one lowercase letter, one
            uppercase letter, and be 6 to 15 characters long.
          </FormErrorMessage>
        )}
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
          Sign up
        </Button>
      </Stack>
      <Toaster />
    </form>
  );
}
