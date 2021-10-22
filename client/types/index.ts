import * as z from "zod";

export enum Status {
  IDLE = "IDLE",
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
}

export enum HttpMethod {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}

export interface HttpResponse {
  status: number;
  body: object | null;
}

export type LogInError = z.infer<typeof LogInError>;
export const LogInError = z.object({
  type: z.string(),
  detail: z.string(),
  status: z.string(),
});

export interface QueryKeyObject {
  pageParam: undefined;
  queryKey: string[];
}

export interface ReviewChart {
  isStatistic: boolean;
  size: string;
  interactive: boolean;
  reviewId: string;
  review: Review;
  setSavory?: Function;
  setSweet?: Function;
  setSmokey?: Function;
  setWoody?: Function;
  setEthereal?: Function;
  setFruity?: Function;
  setHerbal?: Function;
  setSpicy?: Function;
  setCitrus?: Function;
  setFloral?: Function;
  setEarthy?: Function;
}

export * from "types/query_keys";
export * from "types/resources";
