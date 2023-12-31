import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { Flex, Heading, Text } from "@chakra-ui/react";

export function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    // console.log(err); TODO: handle this error
    errorMessage = "Unknown error";
  }

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Heading>Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text>{errorMessage}</Text>
    </Flex>
  );
}
