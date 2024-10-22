import { ethers } from "ethers";
const { PRIVATE_KEY = "" } = process.env;
export const provider = new ethers.JsonRpcProvider(process.env.RPC!);

export const wssProvider = new ethers.WebSocketProvider(process.env.WSRPC!);

export const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
