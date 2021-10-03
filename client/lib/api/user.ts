import Request from "lib/request";
import Base from "lib/api/base";
import {
  User,
  HttpMethod,
  LoadUserQueryKey,
  RegisterUserQueryKey,
  LogInError,
} from "types";

export default {
  loadUser(): Promise<User> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/users/current`),
    }).then(({ body }) => User.parse(body));
  },
  loginFn(queryKeyObject: LoadUserQueryKey): Promise<User> {
    let email = queryKeyObject.email;
    let password = queryKeyObject.password;

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
    let email = queryKeyObject.email;
    let password = queryKeyObject.password;
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
  logoutFn(): Promise<any> {
    return Request.make({
      method: HttpMethod.DELETE,
      url: Base.url(`/sessions`),
    }).then((res) => res);
  },
};
