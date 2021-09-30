import Request from "lib/request";
import Base from "lib/api/base";
import { Incense, HttpMethod, QueryKeyObject } from "types";

export default {
  get(queryKeyObject: QueryKeyObject): Promise<Incense> {
    let id = queryKeyObject.queryKey[1];
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses/${id}`),
    }).then(({ body }) => Incense.parse(body));
  },
  search(queryKeyObject: QueryKeyObject): Promise<Incense[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses`),
      params: {
        brand_id: queryKeyObject["brandId"],
        country: queryKeyObject["country"],
        includes_ingredient_ids: queryKeyObject["includesIngredientIds"],
        excludes_ingredient_ids: queryKeyObject["excludesIngredientIds"],
      },
    }).then(({ body }) => {
      Incense.array().parse(body);
    });
  },
  listAll(): Promise<Incense[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses`),
    }).then(({ body }) => Incense.array().parse(body));
  },
};
