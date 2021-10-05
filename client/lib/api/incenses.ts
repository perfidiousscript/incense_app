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
    console.log("queryKeyObject: ", queryKeyObject);
    let params = query;
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses`),
      params: {
        brand_id: queryKeyObject["brand"],
        country: queryKeyObject["country"],
        includes_ingredient_ids: queryKeyObject["includedIngredients"],
        excludes_ingredient_ids: queryKeyObject["excludedIngredients"],
      },
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
};
