import { ContractRunner } from "ethers";
import { Oracle__factory } from "@/types";

const create = (provider: ContractRunner) =>
  Oracle__factory.connect(process.env.ORACLE_ADDR!, provider);

export default create;
