import { Friends } from "./friends";
import { Grid } from "@chakra-ui/react";
import UserContainer from "./user-container";


export function Sidebar() {

  return (
    <Grid
      bg='hsl(213.3, 13.4%, 13.1%)'
      height='100vh'
      templateRows='7rem auto'
    >
      <UserContainer />
      <Friends />
    </Grid>
  )
}
