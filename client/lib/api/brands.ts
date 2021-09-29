import Request from "lib/request";
import Base from "lib/api/base";
import { Brand, HttpMethod } from "types";

type QueryKeyObject = {
  pageParam: undefined;
  queryKey: String[];
};

export default {
  get(queryKeyObject: QueryKeyObject): Promise<Brand> {
    let id = queryKeyObject.queryKey[1];
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/brands/${id}`),
    }).then(({ body }) => Brand.parse(body));
  },
  list(): Promise<Brand[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/brands`),
    }).then(({ body }) => Brand.array().parse(body));
  },
};
