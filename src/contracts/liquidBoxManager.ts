import { ContractRunner } from "ethers";
import { LiquidBoxManager__factory } from "@/types";

const create = (provider: ContractRunner) =>
  LiquidBoxManager__factory.connect(
    process.env.LIQUID_BOX_MANAGER_ADDR!,
    provider
  );

export default create;
