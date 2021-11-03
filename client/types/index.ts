import * as z from "zod";
import { Review, IncenseStatistic } from "types/resources";

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

export type Headers = Record<string, string>;

export type ReviewChart = {
  size: string;
  interactive: boolean;
  reviewId: string;
  review?: Partial<Review>;
  incenseStatistic?: Partial<IncenseStatistic>;
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
};

export interface MutationError {
  status: string;
  body: {
    error: {
      detail: string;
      status: string;
      type: string;
      params: Record<string, string[]>;
    };
  };
}

export type LoginError = z.infer<typeof LoginError>;
export const LoginError = z.object({
  detail: z.string(),
  status: z.string(),
  type: z.string(),
});

export * from "types/query_keys";
export * from "types/resources";
