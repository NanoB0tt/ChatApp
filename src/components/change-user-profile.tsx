import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FileInput {
  picture: FileList;
}

const FILE_URL = '/api/files/upload';

export function ChangeUserProfile({ isOpen, onClose }: AlertProps) {
  const axiosPrivate = useAxiosPrivate();
  const cancelRef = useRef<HTMLButtonElement | null>(null)
  const { register, handleSubmit } = useForm<FileInput>();

  const onSubmit: SubmitHandler<FileInput> = async (data) => {
    const formData = new FormData()
    formData.append('file', data.picture[0])
    try {
      await axiosPrivate.post(FILE_URL,
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );
    } catch (err) {
      console.log(err);
    }
    console.log(formData)
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Search File
            </AlertDialogHeader>

            <AlertDialogBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl >
                  <FormLabel>File</FormLabel>
                  <input {...register("picture")} type="file" />
                </FormControl>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' type="submit" onClick={onClose} ml={3}>
                  Accept
                </Button>
              </form>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' type="submit" onClick={onClose} ml={3}>
                Accept
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
