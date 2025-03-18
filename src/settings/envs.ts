import { cleanEnv, str, port } from "envalid";

export const envs = cleanEnv(process.env, {
  // NODE_ENV: str({ choices: ["development", "production", "test"] }),
  PORT: port({ default: 3000 }),
  MONGO_URL: str(),
});
