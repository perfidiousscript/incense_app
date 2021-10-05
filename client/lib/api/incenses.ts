import Request from "lib/request";
import Base from "lib/api/base";
import { Incense, HttpMethod, QueryKey, IncenseSearchMutation } from "types";
import { snakeCase } from "snake-case";

export default {
  get(queryKeyObject: QueryKey): Promise<Incense> {
    let id = queryKeyObject.queryKey[1];
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses/${id}`),
    }).then(({ body }) => Incense.parse(body));
  },
  search(queryKeyObject: IncenseSearchMutation): Promise<Incense[]> {
    let paramsObject = {};
    for (const param in queryKeyObject) {
      if (queryKeyObject[param].length !== 0) {
        let sluggedParam = queryKeyObject[param]
          .replace(/\s+/g, "-")
          .toLowerCase();
        let snakeCasedParam = snakeCase(param);
        paramsObject[snakeCasedParam] = sluggedParam;
      }
    }
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses`),
      params: paramsObject,
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
