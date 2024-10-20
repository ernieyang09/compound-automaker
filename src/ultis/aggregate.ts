import { provider } from "@/web3";
import Multi from "@/contracts/multi";
import { chunk, flatten } from "lodash";
import { BaseContract } from "ethers";

type AggregateArr = {
  contract: BaseContract;
  method: string;
  params: any;
};
export const aggregateCall = async (arr: AggregateArr[], chunkSize = 2) => {
  const multi = Multi(provider);

  const calls = chunk(
    arr.map((call) => ({
      target: call.contract.target.toString().toLowerCase(),
      callData: call.contract.interface.encodeFunctionData(
        call.method,
        call.params
      ),
    })),
    chunkSize
  ).map((c) => multi.tryAggregate.staticCall(false, c));

  const res = await Promise.all(calls);

  const data = flatten(res)
    .map(([bool, encoded], i) => {
      if (!bool) {
        return false;
      }
      try {
        return [
          arr[i].contract.interface.decodeFunctionResult(
            arr[i].method,
            encoded
          ),
          i,
        ];
      } catch (e) {
        console.log("0.0");
        return false;
      }
    })
    .filter(Boolean);

  return data;
};
