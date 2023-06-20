import { LoginForm } from "./components";
import FormLayout from "./layout/form-layout";

export function Login() {
  return (
    <FormLayout type='login'>
      <LoginForm />
    </FormLayout>
  )
}
