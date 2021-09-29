import fetch from "isomorphic-unfetch";
import humps from "humps";

import { HttpMethod, HttpResponse } from "types";

import * as Cookies from "lib/cookies";

const objectToParams = (params: object) =>
  Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => key + "=" + encodeURIComponent(value))
    .join("&");

export default {
  async make(options: {
    method: HttpMethod;
    url: string;
    body?: object;
    headers?: Record<string, string>;
    params?: object;
  }): Promise<HttpResponse> {
    const urlWithParams = options.params
      ? `${options.url}?${objectToParams(options.params)}`
      : options.url;

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (!process.browser) {
      /*
      We forward cookies from the client on the server, when
      making requests from the server
      */
      const cookies = Cookies.getCookies();
      if (cookies) headers["cookie"] = cookies;
    }

    const response = await fetch(urlWithParams, {
      credentials: "include",
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const text = await response.text();
    if (text === "") {
      if (!response.ok) throw createResponse(response, null);
      return createResponse(response, null);
    }
    const json = JSON.parse(text);
    const camelized = humps.camelizeKeys(json);
    if (!response.ok) throw createResponse(response, camelized);
    return createResponse(response, camelized);
  },
};

const createResponse = <T extends null | object>(
  response: Response,
  body: T
): HttpResponse => ({
  status: response.status,
  body,
});
