import Request from "lib/request";
import Base from "lib/api/base";
import {
  Incense,
  HttpMethod,
  QueryKeyObject,
  IncenseSearchMutationQueryKey,
  IncenseUpdateMutationQueryKey,
  IncenseCreateQueryKey,
} from "types";

export default {
  get(queryKeyObject: QueryKeyObject): Promise<Incense> {
    const id = queryKeyObject.queryKey[1];
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses/${id}`),
    }).then(({ body }) => Incense.parse(body));
  },
  search(queryKeyObject: IncenseSearchMutationQueryKey): Promise<Incense[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses`),
      params: queryKeyObject,
    }).then(({ body }) => {
      return Incense.array().parse(body);
    });
  },
  list(): Promise<Incense[]> {
    return Request.make({
      method: HttpMethod.GET,
      url: Base.url(`/incenses`),
    }).then(({ body }) => Incense.array().parse(body));
  },
  create(queryKeyObject: IncenseCreateQueryKey): Promise<Incense> {
    return Request.make({
      method: HttpMethod.POST,
      url: Base.url(`/incenses`),
      body: {
        incense: queryKeyObject,
      },
    }).then(({ body }) => Incense.parse(body));
  },
  update(queryKeyObject: IncenseUpdateMutationQueryKey): Promise<Incense> {
    const slug = queryKeyObject.slug;
    delete queryKeyObject.slug;
    return Request.make({
      method: HttpMethod.PATCH,
      url: Base.url(`/incenses/${slug}`),
      body: {
        incense: queryKeyObject,
      },
    }).then(({ body }) => Incense.parse(body));
  },
};
