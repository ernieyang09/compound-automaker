import { ContractRunner } from "ethers";
import { Multi__factory } from "@/types";

const create = (provider: ContractRunner) =>
  Multi__factory.connect(process.env.MULTICALL_ADDR!, provider);

export default create;
