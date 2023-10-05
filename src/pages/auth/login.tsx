import { FormLayout } from "./layout/form-layout";
import { LoginForm } from "./components";

export function Login() {
  return (
    <FormLayout type="login">
      <LoginForm />
    </FormLayout>
  );
}
