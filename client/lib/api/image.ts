import Request from "lib/request";
import Imgur from "lib/api/imgur";
import { HttpMethod } from "types";
import Config from "lib/config";

export default {
  upload(image: string): Promise<Response> {
    const formdata = new FormData();
    formdata.append("image", image);
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
