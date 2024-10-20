import StakeVault from "@/contracts/stakeVault";

import { wallet } from "@/web3";

export const provideLp = async () => {
  const stakeVault = StakeVault(wallet);
  const share = await stakeVault.balanceOf(wallet.address);
};
