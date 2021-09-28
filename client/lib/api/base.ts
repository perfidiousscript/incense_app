import Config from "lib/config";

const Base = {
  URL: `${Config.API_BASE_HOST}/api/v1`,
  url: (path: string) => `${Base.URL}${path}`,
};

export default Base;
