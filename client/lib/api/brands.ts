import Request from "lib/request";
import Base from "lib/api/base";
import { Brand, HttpMethod, QueryKeyObject } from "types";

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
  create(queryKeyObject: QueryKeyObject): Promise<Brand> {
    let name = queryKeyObject.name;
    let description = queryKeyObject.description;
    let country = queryKeyObject.country;
    let image_url = queryKeyObject.imageUrl;
    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/brands`),
      body: {
        brand: {
          name,
          description,
          country,
          image_url,
        },
      },
    }).then(({ body }) => Brand.parse(body));
  },
};
