import "dotenv/config";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { stake } from "./method/stake";
import { provideLp } from "./method/provideLp";
import { swapToStake } from "./method/swapToStake";
import { unstakeAndSwap } from "./method/unstakeAndSwap";

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
  if (argvs.method === "swapToStake") {
    await swapToStake();
  }
  if (argvs.method === "stake") {
    await stake();
  }

  if (argvs.method === "unstakeAndSwap") {
    await unstakeAndSwap();
  }

  // if (argvs.method === "provideLp") {
  //   await provideLp();
  // }
};

main();
