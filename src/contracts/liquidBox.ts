import { ContractRunner } from "ethers";
import { LiquidBox__factory } from "@/types";

const create = (provider: ContractRunner) =>
  LiquidBox__factory.connect(process.env.LIQUID_BOX_ADDR!, provider);

export default create;
