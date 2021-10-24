import { initReactQueryAuth } from "react-query-auth";
import User from "lib/api/user";
import { User as UserInterface } from "types";

interface Error {
  message: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
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
