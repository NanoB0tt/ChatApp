import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { RegisterInput } from "../interfaces/interfaces";

const REGISTER_URL = '/api/auth/register';

const notification = () => {
  notifySuccess();
  setTimeout(() => {
    notifyRedirect();
  }, 1000)
}

const notifySuccess = () =>
  toast.success(
    'Your account was created successfully!',
    { duration: 1000 }
  );

const notifyRedirect = () =>
  toast.loading(
    'Redirecting...',
    { duration: 1000 }
  )

export function RegisterForm() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      let res = await axios.post(REGISTER_URL,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.status === 201) {
        notification();
        setTimeout(() => {
          navigate("/login/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => <Input type="text" {...field} />}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email Address</FormLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input type="email" {...field} />}
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
          Sign up
        </Button>
      </Stack>
      <Toaster />
    </form>
  )
}
