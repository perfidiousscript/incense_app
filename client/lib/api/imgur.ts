import Config from "lib/config";

const Imgur = {
  URL: `${Config.IMGUR_BASE_HOST}/3`,
  url: (path: string) => `${Imgur.URL}${path}`,
};

export default Imgur;
