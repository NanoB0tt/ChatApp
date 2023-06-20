import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";
import axios from "../../../api/axios";
import { LoginInput } from "../interfaces/interfaces";
import { User } from "../../../context/interfaces";

const LOGIN_URL = '/api/auth/login';

export function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const res = await axios.post<User>(LOGIN_URL,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.status === 201) {
        console.log(res.data)
        setAuth(res.data);
        setTimeout(() => {
          navigate("/",);
        }, 1000);

      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel>Email address</FormLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input type="text" {...field} />}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input type="password" {...field} />}
        />
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
    </form>
  )
}
