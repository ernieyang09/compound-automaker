import ERC4626Router from "@/contracts/erc4626Router";
import ERC20 from "@/contracts/ecr20";
import SwapRouter from "@/contracts/swapRouter";
import StakeVault from "@/contracts/stakeVault";
import QuoterV2 from "@/contracts/quoterV2";

import { wallet, wssProvider } from "@/web3";
import { getPools } from "@/ultis/pools";
import { pack } from "@/ultis/route";
import { aggregateCall } from "@/ultis/aggregate";
import { last, maxBy } from "lodash";

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

export const unstakeAndSwap = async () => {
  let v2, v3;
  const poolPromise = getPools();
  const token1 = ERC20(process.env.TOKEN2_ADDR!, wssProvider);

  const filter = token1.filters.Transfer(
    process.env.FEE_DISTRIBUTOR_ADDR!,
    process.env.STAKE_VAULT_ADDR!
  );

  console.log("listen");
  token1.on(filter, async (from, to, value) => {
    console.log(from, to, value);
    const erc4626Router = ERC4626Router(wallet);
    const stakeVault = StakeVault(wallet);
    const token2 = ERC20(process.env.TOKEN2_ADDR!, wallet);
    const quoterV2 = QuoterV2(wallet);
    const swapRouter = SwapRouter(wallet);

    //   withdraw
    console.log("withdraw");
    const stakingShare = await stakeVault.balanceOf(wallet.address);
    const tokenOut = await stakeVault.convertToAssets(stakingShare);

    const withdrawTx = await erc4626Router.redeem(
      process.env.STAKE_VAULT_ADDR!,
      wallet.address,
      stakingShare,
      (tokenOut * BigInt(999)) / BigInt(1000)
    );

    await withdrawTx.wait();

    // swap
    console.time("getPool");
    ({ v2, v3 } = await poolPromise);
    console.timeEnd("getPool");
    const v3Routes = Bs(v3, process.env.TOKEN2_ADDR!, process.env.TOKEN1_ADDR!);
    const token2Balance = await token2.balanceOf(wallet.address);
    const calls = v3Routes.map((route) => ({
      contract: quoterV2,
      method: "quoteExactInput",
      params: [pack(route), token2Balance],
    }));

    console.time("agg");
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
    console.timeEnd("agg");

    const maxRoute = maxBy(data, (d) => d[0].amountOut)!;
    const amountOut = maxRoute[0].amountOut!;

    if (Number(amountOut) / 1e6 / (Number(token2Balance) / 1e18) < 0.99) {
      throw "Slippage too high";
    }
    console.log(
      `ratio: ${Number(amountOut) / 1e6 / (Number(token2Balance) / 1e18)}`
    );

    const exchangeTx = await swapRouter.exactInput({
      // @ts-expect-error
      path: calls[last(maxRoute)].params[0],
      recipient: wallet.address,
      deadline: Math.floor(Date.now() / 1000) + 60,
      amountIn: token2Balance,
      amountOutMinimum: (amountOut * BigInt(998)) / BigInt(1000), // 0.2%
    });

    await exchangeTx.wait();
    process.exit();
  });
};
