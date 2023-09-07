import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form"
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";

const REGISTER_URL = '/api/auth/register';

function notification() {
  notifySuccess();
  setTimeout(() => {
    notifyRedirect();
  }, 1000)
}

function notifySuccess() {
  toast.success(
    'Your account was created successfully!',
    { duration: 1000 }
  );
}

function notifyRedirect() {
  toast.loading(
    'Redirecting...',
    { duration: 1000 }
  )
}

export function RegisterForm() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(data: any): Promise<void> {
    try {
      let res = await axiosPrivate.post(REGISTER_URL,
        JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
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
      <FormControl isRequired isInvalid={!!errors.userName}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          {...register("userName", { maxLength: 20, minLength: 3 })}
        />
        {errors.userName &&
          <FormErrorMessage>Username must be between 3 and 20 characters in length.</FormErrorMessage>
        }
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.email}>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="text"
          {...register("email", {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          })}
        />
        {errors.email &&
          <FormErrorMessage>Invalid email format. Please enter a valid email address.</FormErrorMessage>
        }
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          {...register("password", {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
          })}
        />
        {errors.password &&
          <FormErrorMessage>Password must contain at least one digit, one lowercase letter, one uppercase letter, and be 6 to 15 characters long.</FormErrorMessage>
        }
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
