const config = {
  DEVELOPMENT: process.env.NODE_ENV === "development",
  PRODUCTION: process.env.NODE_ENV === "production",

  API_BASE_HOST: process.env.NEXT_PUBLIC_API_BASE_HOST as string,
};

Object.keys(config).forEach((configKey) => {
  if (config[configKey] === undefined)
    throw new ReferenceError(`Environment Variable (${configKey}) Not Found`);
});

export default config;
