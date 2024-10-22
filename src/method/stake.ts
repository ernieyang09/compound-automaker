import ERC4626Router from "@/contracts/erc4626Router";
import ERC20 from "@/contracts/ecr20";
import StakeVault from "@/contracts/stakeVault";
import StackVault from "@/contracts/stackVault";

import { wallet } from "@/web3";

export const stake = async () => {
  const erc4626Router = ERC4626Router(wallet);
  const stakeVault = StakeVault(wallet);
  const stackVault = StackVault(wallet);
  const token2 = ERC20(process.env.TOKEN2_ADDR!, wallet);

  // borrow more
  console.log("borrow");
  const info = await stackVault.userPositionInfo(wallet.address);
  const shouldBorrowAmount =
    (info.collateralValue * BigInt(74)) / BigInt(1000) - info.borrowValue;

  const borrowTx = await stackVault.borrow(wallet.address, shouldBorrowAmount);
  await borrowTx.wait();

  // stake
  console.log("stake");
  const token2Balance = await token2.balanceOf(wallet.address);
  const share = await stakeVault.convertToShares(token2Balance);

  const depositTx = await erc4626Router.deposit(
    process.env.STAKE_VAULT_ADDR!,
    wallet.address,
    token2Balance,
    (share * BigInt(999)) / BigInt(1000) // 0.1%
  );

  await depositTx.wait();
};
