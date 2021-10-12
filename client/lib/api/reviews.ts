import Request from "lib/request";
import Base from "lib/api/base";
import { Review, HttpMethod, QueryKeyObject } from "types";

export default {
  create(queryKeyObject: QueryKeyObject): Promise<Review> {
    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/reviews`),
      body: {
        review: queryKeyObject,
      },
    }).then(({ body }) => Review.parse(body));
  },
};
