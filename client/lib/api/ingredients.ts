import Request from "lib/request";
import Base from "lib/api/base";
import { Ingredient, HttpMethod, QueryKeyObject } from "types";

export default {
  get(queryKeyObject: QueryKeyObject): Promise<Ingredient> {
    const id = queryKeyObject.queryKey[1];
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/ingredients/${id}`),
    }).then(({ body }) => Ingredient.parse(body));
  },
  list(): Promise<Ingredient[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/ingredients`),
    }).then(({ body }) => Ingredient.array().parse(body));
  },
  create(queryKeyObject: QueryKeyObject): Promise<Ingredient> {
    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/ingredients`),
      body: {
        ingredient: queryKeyObject,
      },
    }).then(({ body }) => Ingredient.parse(body));
  },
};
