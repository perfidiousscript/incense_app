import Request from "lib/request";
import Base from "lib/api/base";
import {
  Brand,
  HttpMethod,
  QueryKeyObject,
  BrandsCreateQueryKey,
  BrandsUpdateQueryKey,
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
  search(queryKeyObject: QueryKeyObject): Promise<Brand[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/brands`),
      params: queryKeyObject,
    }).then(({ body }) => Brand.array().parse(body));
  },
  create(queryKeyObject: BrandsCreateQueryKey): Promise<Brand> {
    const name = queryKeyObject.name;
    const description = queryKeyObject.description;
    const country = queryKeyObject.country;
    const image_url = queryKeyObject.imageUrl;
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
