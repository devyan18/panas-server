import { app } from "./src/modules/app/api";
import { envs } from "./src/settings/envs";

async function main() {
  app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });
}

await main();
