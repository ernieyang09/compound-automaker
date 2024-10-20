import { ContractRunner } from "ethers";
import { GaugeV2__factory } from "@/types";

const create = (provider: ContractRunner) =>
  GaugeV2__factory.connect(process.env.GAUGEV2_ADDR!, provider);

export default create;
