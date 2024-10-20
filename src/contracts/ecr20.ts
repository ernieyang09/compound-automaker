import { ContractRunner } from "ethers";
import { Erc20__factory } from "@/types";

const create = (addr: string, provider: ContractRunner) =>
  Erc20__factory.connect(addr, provider);

export default create;
