import { initReactQueryAuth } from "react-query-auth";
import { loadUser, loginFn, registerFn, logoutFn } from "lib/api/user";

interface User {
  id: string;
  username: string;
}

interface Error {
  message: string;
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  User,
  Error,
  LoginCredentials,
  RegisterCredentials
>(authConfig);
