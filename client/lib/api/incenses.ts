import Request from "lib/request";
import Base from "lib/api/base";
import { Incense, HttpMethod, QueryKey, IncenseSearchMutation } from "types";

export default {
  get(queryKeyObject: QueryKey): Promise<Incense> {
    let id = queryKeyObject.queryKey[1];
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses/${id}`),
    }).then(({ body }) => Incense.parse(body));
  },
  search(queryKeyObject: IncenseSearchMutation): Promise<Incense[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses`),
      params: queryKeyObject,
    }).then(({ body }) => {
      return Incense.array().parse(body);
    });
  },
  listAll(): Promise<Incense[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses`),
    }).then(({ body }) => Incense.array().parse(body));
  },
  create(queryKeyObject: QueryKeyObject): Promise<Incense> {
    let name = queryKeyObject.name;
    let description = queryKeyObject.description;
    let brand_id = queryKeyObject.brandId;
    let image_url = queryKeyObject.imageUrl;
    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/incenses`),
      body: {
        incense: {
          name,
          description,
          brand_id,
          image_url,
        },
      },
    }).then(({ body }) => Incense.parse(body));
  },
};
