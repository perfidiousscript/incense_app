import Request from "lib/request";
import Base from "lib/api/base";
import { Review, HttpMethod, ReviewCreateQueryKey } from "types";

export default {
  create(queryKeyObject: ReviewCreateQueryKey): Promise<Review> {
    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/reviews`),
      body: {
        review: queryKeyObject,
      },
    }).then(({ body }) => Review.parse(body));
  },
};
