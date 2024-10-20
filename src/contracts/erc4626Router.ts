import { ContractRunner } from "ethers";
import { Erc4626Router__factory } from "@/types";

const create = (provider: ContractRunner) =>
  Erc4626Router__factory.connect(process.env.ERC4626_ROUTER_ADDR!, provider);

export default create;
