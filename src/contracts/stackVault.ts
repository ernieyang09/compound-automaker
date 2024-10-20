import { ContractRunner } from "ethers";
import { StackVault__factory } from "@/types";

const create = (provider: ContractRunner) =>
  StackVault__factory.connect(process.env.STACK_VAULT_ADDR!, provider);

export default create;
