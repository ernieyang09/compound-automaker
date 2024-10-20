import { ContractRunner } from "ethers";
import { QuoterV2__factory } from "@/types";

const create = (provider: ContractRunner) =>
  QuoterV2__factory.connect(process.env.QUOTERV2_ADDR!, provider);

export default create;
