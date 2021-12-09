import Request from "lib/request";
import Base from "lib/api/base";
import {
  User,
  HttpMethod,
  LoadUserQueryKey,
  RegisterUserQueryKey,
} from "types";

export default {
  loadUser(): Promise<User> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/users/current`),
    }).then(({ body }) => User.parse(body));
  },
  loginFn(queryKeyObject: LoadUserQueryKey): Promise<User> {
    const email = queryKeyObject.email;
    const password = queryKeyObject.password;

    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/sessions`),
      body: {
        session: {
          email,
          password,
        },
      },
    }).then(({ body }) => User.parse(body));
  },
  registerFn(queryKeyObject: RegisterUserQueryKey): Promise<User> {
    const email = queryKeyObject.email;
    const password = queryKeyObject.password;
    const username = queryKeyObject.username;
    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/users`),
      body: {
        user: {
          email,
          username,
          password,
        },
      },
    }).then(({ body }) => User.parse(body));
  },
  logoutFn(): Promise<number> {
    return Request.make({
      method: HttpMethod.DELETE,
      url: Base.url(`/sessions`),
    }).then(({ status }) => status);
  },
  confirmEmail(queryKeyObject: QueryKeyObject): Promise<number> {
    const token = queryKeyObject.queryKey[1];
    return Request.make({
      method: HttpMethod.PATCH,
      url: Base.url("/users/confirm_email"),
      body: { email_confirmation_token: token },
    }).then(({ status }) => status);
  },
};
