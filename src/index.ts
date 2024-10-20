import "dotenv/config";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { stake } from "./method/stake";

const argvs = yargs(hideBin(process.argv))
  .options({
    method: {
      type: "string",
    },
  })
  .parseSync();

const main = async () => {
  if (!argvs.method) {
    return;
  }
  if (argvs.method === "stake") {
    await stake();
  }
};

main();