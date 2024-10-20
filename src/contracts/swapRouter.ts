import { ContractRunner } from "ethers";
import { SwapRouter__factory } from "@/types";

const create = (provider: ContractRunner) =>
  SwapRouter__factory.connect(process.env.SWAP_ROUTER_ADDR!, provider);

export default create;
