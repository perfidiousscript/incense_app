import Request from "lib/request";
import Imgur from "lib/api/imgur";
import { HttpMethod, QueryKeyObject } from "types";
import Config from "lib/config";

export default {
  upload(queryKeyObject: QueryKeyObject): Promise<Response> {
    const formdata = new FormData();
    formdata.append("image", queryKeyObject["image"]);
    return Request.make({
      method: HttpMethod.POST,
      url: Imgur.url(`/image`),
      headers: {
        Authorization: `Client-ID: ${Config.IMGUR_CLIENT_ID}`,
        Accept: "application/json",
      },
      body: formdata,
    }).then(({ body }) => {
      console.log("body: ", body);
      return body;
    });
  },
};
