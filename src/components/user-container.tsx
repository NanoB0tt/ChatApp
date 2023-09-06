import { Grid } from "@chakra-ui/react";
import { UserProfile } from "./user-profile";
import UserSocial from "./user-social";

export default function UserContainer() {
  return (
    <Grid
      h='32'
      templateColumns='1fr auto 2rem'
    >
      <UserProfile />
      <UserSocial />
    </Grid>
  )
}
