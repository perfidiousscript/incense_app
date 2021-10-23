import Request from "lib/request";
import Imgur from "lib/api/imgur";
import { HttpMethod, ImageUploadResponse } from "types";
import Config from "lib/config";

export default {
  upload(image: string): Promise<ImageUploadResponse> {
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
    }).then(({ body }) => ImageUploadResponse.parse(body));
  },
};
