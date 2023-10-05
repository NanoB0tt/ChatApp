import { FormLayout } from "./layout/form-layout";
import { RegisterForm } from "./components";

export function Register() {
  return (
    <FormLayout type="register">
      <RegisterForm />
    </FormLayout>
  );
}
