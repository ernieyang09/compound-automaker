import GaugeV2 from "@/contracts/gaugeV2";
import ERC20 from "@/contracts/ecr20";
import SwapRouter from "@/contracts/swapRouter";
import QuoterV2 from "@/contracts/quoterV2";
import LiquidBox from "@/contracts/liquidBox";
import LiquidBoxManager from "@/contracts/liquidBoxManager";

import { wallet } from "@/web3";
import { getPools } from "@/ultis/pools";
import { pack } from "@/ultis/route";
import { aggregateCall } from "@/ultis/aggregate";
import { last, maxBy } from "lodash";

// const Vs = (s, e, t, n = [], d = 0) => {
//   let r = [];
//   if (d >= Qs) return r;
//   const i = s.filter(
//     (l) =>
//       e.toLowerCase() === l.token0.address.toLowerCase() ||
//       e.toLowerCase() === l.token1.address.toLowerCase()
//   );
//   for (const l of i) {
//     const m = {
//         from: e.toLowerCase(),
//         to:
//           e.toLowerCase() === l.token0.address.toLowerCase()
//             ? l.token1.address.toLowerCase()
//             : l.token0.address.toLowerCase(),
//         stable: l.isStable,
//       },
//       h = n.concat(m);
//     if (m.to === t) r.push(h);
//     else {
//       const g = m.to.toLowerCase(),
//         c = s.filter((T) => T.address !== l.address),
//         p = Vs(c, g, t, h, d + 1);
//       r = r.concat(p);
//     }
//   }
//   return r;
// };

const Bs = (s, e, t, n = [], d = 0) => {
  let r = [];
  if (d >= 5) return r;
  const i = s.filter(
    (l) =>
      e.toLowerCase() === l.token0.address.toLowerCase() ||
      e.toLowerCase() === l.token1.address.toLowerCase()
  );
  for (const l of i) {
    const m = {
        from: e.toLowerCase(),
        to:
          e.toLowerCase() === l.token0.address.toLowerCase()
            ? l.token1.address.toLowerCase()
            : l.token0.address.toLowerCase(),
        fee: l.fee,
        pool: l,
      },
      h = n.concat(m);
    if (m.to === t.toLowerCase()) r.push(h);
    else {
      const g = m.to.toLowerCase(),
        c = s.filter((T) => T.address !== l.address),
        p = Bs(c, g, t, h, d + 1);
      r = r.concat(p);
    }
  }
  return r;
};
export const swapToStake = async () => {
  let v2, v3;
  const poolPromise = getPools();
  const gauge = GaugeV2(wallet);
  const token1 = ERC20(process.env.TOKEN1_ADDR!, wallet);
  const quoterV2 = QuoterV2(wallet);
  const swapRouter = SwapRouter(wallet);
  const liquidBox = LiquidBox(wallet);
  const liquidBoxManager = LiquidBoxManager(wallet);

  // unstake lp
  console.log("unstake lp");
  const amount = await gauge.balanceOf(wallet.address);
  if (amount !== 0n) {
    const reward = await gauge.collectReward();
    const unstakeTx = await gauge.withdraw(amount);

    await Promise.all([reward.wait, unstakeTx.wait]);
  }

  // withdraw lp
  console.log("withdraw lp");
  const lpAmount = await liquidBox.balanceOf(wallet.address);
  if (lpAmount !== 0n) {
    const withdrawTx = await liquidBoxManager.withdraw(
      process.env.LIQUID_BOX_ADDR!,
      lpAmount,
      0,
      0
    );

    await withdrawTx.wait();
  }

  // swap
  console.log("swap");
  ({ v2, v3 } = await poolPromise);
  const v3Routes = Bs(v3, process.env.TOKEN1_ADDR!, process.env.TOKEN2_ADDR!);
  const token1Balance = await token1.balanceOf(wallet.address);

  const calls = v3Routes.map((route) => ({
    contract: quoterV2,
    method: "quoteExactInput",
    params: [pack(route), token1Balance],
  }));

  const data = (await aggregateCall(calls)) as unknown as [
    {
      amountOut: bigint;
      sqrtPriceX96AfterList: bigint[];
      initializedTicksCrossedList: bigint[];
      gasEstimate: bigint;
      idx: number;
    },
    number
  ][];

  const maxRoute = maxBy(data, (d) => d[0].amountOut)!;

  const amountOut = maxRoute[0].amountOut!;

  if (Number(amountOut) / 1e18 / (Number(token1Balance) / 1e6) < 0.99) {
    throw "Slippage too high";
  }

  const exchangeTx = await swapRouter.exactInput({
    // @ts-expect-error
    path: calls[last(maxRoute)].params[0],
    recipient: wallet.address,
    deadline: Math.floor(Date.now() / 1000) + 60,
    amountIn: token1Balance,
    amountOutMinimum: (amountOut * BigInt(998)) / BigInt(1000), // 0.2%
  });

  await exchangeTx.wait();
};
