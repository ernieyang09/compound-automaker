import { ethers } from "ethers";
const { PRIVATE_KEY = "" } = process.env;
export const provider = new ethers.JsonRpcProvider(process.env.RPC!, 111188);

export const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
