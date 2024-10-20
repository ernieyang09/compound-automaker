import { ContractRunner } from "ethers";
import { StakeVault__factory } from "@/types";

const create = (provider: ContractRunner) =>
  StakeVault__factory.connect(process.env.STAKE_VAULT_ADDR!, provider);

export default create;
