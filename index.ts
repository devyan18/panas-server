import { app } from "./src/modules/app/api";
import { envs } from "./src/settings/envs";
import { startConnectionDb } from "./src/settings/db";

async function main() {
  await startConnectionDb(envs.MONGO_URL);

  app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });
}

await main();
