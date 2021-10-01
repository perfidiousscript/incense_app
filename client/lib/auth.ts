import { initReactQueryAuth } from "react-query-auth";
import User from "lib/api/user";

interface UserInterface {
  id: string;
  email: string;
  password: string;
  username: string;
}

interface Error {
  message: string;
}

const authConfig = {
  loadUser: User.loadUser,
  loginFn: User.loginFn,
  registerFn: User.registerFn,
  logoutFn: User.logoutFn,
  waitInitial: false,
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  UserInterface,
  Error,
  LoginCredentials,
  RegisterCredentials
>(authConfig);
