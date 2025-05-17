import dotenv from "dotenv";

dotenv.config();

function validateEnv<T>(envVar: string | undefined, defaultValue?: T): T {
  if (envVar === undefined && defaultValue === undefined) {
    throw new Error(`Missing environment variable ${envVar}`);
  }

  if (envVar === undefined && defaultValue !== undefined) {
    return defaultValue;
  }

  return envVar as T;
}

export default {
  SERVER: {
    PORT: validateEnv<number>(process.env.SERVER_PORT, 3000),
    DB_URI: validateEnv<string>(process.env.DB_URI),
    BASE_PATH: validateEnv<string>(process.env.BASE_PATH),
    BASE_URL_SITE: validateEnv<string>(process.env.BASE_URL_SITE),
  },
};
