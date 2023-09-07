import { Friends } from "./friends";
import { Grid } from "@chakra-ui/react";
import UserContainer from "./user-container";


export function Sidebar() {

  return (
    <Grid bg='tomato' height='100vh' templateRows='7rem auto'>
      <UserContainer />
      <Friends />
    </Grid>
  )
}
