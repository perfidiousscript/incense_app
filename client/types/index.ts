// import rootReducer from 'state/reducers';
//
// export type GlobalState = ReturnType<typeof rootReducer>;

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

// export * from "types/actions";
export * from "types/resources";
