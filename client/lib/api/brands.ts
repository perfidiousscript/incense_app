import Request from "lib/request";
import Base from "lib/api/base";
import {
  Brand,
  HttpMethod,
  QueryKeyObject,
  BrandsCreateQueryKey,
  BrandsUpdateQueryKey,
  BrandsSearchQueryKeyObject,
} from "types";

export default {
  get(queryKeyObject: QueryKeyObject): Promise<Brand> {
    const [, slug] = queryKeyObject.queryKey;
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/brands/${slug}`),
    }).then(({ body }) => Brand.parse(body));
  },
  list(): Promise<Brand[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/brands`),
    }).then(({ body }) => Brand.array().parse(body));
  },
  search(queryKeyObject: BrandsSearchQueryKeyObject): Promise<Brand[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/brands`),
      params: queryKeyObject,
    }).then(({ body }) => Brand.array().parse(body));
  },
  create(queryKeyObject: BrandsCreateQueryKey): Promise<Brand> {
    console.log("queryKeyObject: ", queryKeyObject);
    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/brands`),
      body: queryKeyObject,
    }).then(({ body }) => Brand.parse(body));
  },
  update(queryKeyObject: BrandsUpdateQueryKey): Promise<Brand> {
    const slug = queryKeyObject.slug;
    delete queryKeyObject.slug;
    return Request.make({
      method: HttpMethod.PATCH,
      url: Base.url(`/brands/${slug}`),
      body: {
        brand: queryKeyObject,
      },
    }).then(({ body }) => Brand.parse(body));
  },
};
