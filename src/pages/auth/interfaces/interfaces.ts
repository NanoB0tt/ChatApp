export interface LoginInput {
  email: string;
  password: string;
}
export interface RegisterInput extends LoginInput {
  userName: string;
}
