import Request from "lib/request";
import Base from "lib/api/base";
import {
  Review,
  HttpMethod,
  QueryKeyObject,
  ReviewGetQueryKey,
  ReviewCreateQueryKey,
  ReviewUpdateQueryKey,
} from "types";

export default {
  get(queryKeyObject: QueryKeyObject): Promise<Review> {
    const id = queryKeyObject.queryKey[1];
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/reviews/${id}`),
    }).then(({ body }) => Review.parse(body));
  },
  create(queryKeyObject: ReviewCreateQueryKey): Promise<Review> {
    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/reviews`),
      body: {
        review: queryKeyObject,
      },
    }).then(({ body }) => Review.parse(body));
  },
  update(queryKeyObject: ReviewUpdateQueryKey): Promise<Review> {
    console.log("queryKeyObject: ", queryKeyObject);
    return Request.make({
      method: HttpMethod.PATCH,
      url: Base.url(`/reviews/${queryKeyObject.id}`),
      body: {
        review: queryKeyObject,
      },
    }).then(({ body }) => Review.parse(body));
  },
};
