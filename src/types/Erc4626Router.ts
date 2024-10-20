/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common.js";

export interface Erc4626RouterInterface extends Interface {
  getFunction(
    nameOrSignature: "deposit" | "mint" | "redeem" | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deposit",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export interface Erc4626Router extends BaseContract {
  connect(runner?: ContractRunner | null): Erc4626Router;
  waitForDeployment(): Promise<this>;

  interface: Erc4626RouterInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  deposit: TypedContractMethod<
    [
      vault: AddressLike,
      to: AddressLike,
      amount: BigNumberish,
      minSharesOut: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  mint: TypedContractMethod<
    [
      vault: AddressLike,
      to: AddressLike,
      shares: BigNumberish,
      maxAmountIn: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  redeem: TypedContractMethod<
    [
      vault: AddressLike,
      to: AddressLike,
      shares: BigNumberish,
      minAmountOut: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  withdraw: TypedContractMethod<
    [
      vault: AddressLike,
      to: AddressLike,
      amount: BigNumberish,
      maxSharesOut: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "deposit"
  ): TypedContractMethod<
    [
      vault: AddressLike,
      to: AddressLike,
      amount: BigNumberish,
      minSharesOut: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [
      vault: AddressLike,
      to: AddressLike,
      shares: BigNumberish,
      maxAmountIn: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "redeem"
  ): TypedContractMethod<
    [
      vault: AddressLike,
      to: AddressLike,
      shares: BigNumberish,
      minAmountOut: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [
      vault: AddressLike,
      to: AddressLike,
      amount: BigNumberish,
      maxSharesOut: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  filters: {};
}
