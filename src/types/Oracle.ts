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

export interface OracleInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "aggregator"
      | "amountOf(uint256,uint256,uint8)"
      | "amountOf(uint256,uint8)"
      | "amountOfAtPrice"
      | "latestPrice(uint256)"
      | "latestPrice()"
      | "token"
      | "valueOf(uint256,uint256,uint8)"
      | "valueOf(uint256,uint8)"
      | "valueOfAtPrice"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "aggregator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "amountOf(uint256,uint256,uint8)",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "amountOf(uint256,uint8)",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "amountOfAtPrice",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "latestPrice(uint256)",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "latestPrice()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "valueOf(uint256,uint256,uint8)",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "valueOf(uint256,uint8)",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "valueOfAtPrice",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "aggregator", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "amountOf(uint256,uint256,uint8)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "amountOf(uint256,uint8)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "amountOfAtPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestPrice(uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestPrice()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "valueOf(uint256,uint256,uint8)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "valueOf(uint256,uint8)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "valueOfAtPrice",
    data: BytesLike
  ): Result;
}

export interface Oracle extends BaseContract {
  connect(runner?: ContractRunner | null): Oracle;
  waitForDeployment(): Promise<this>;

  interface: OracleInterface;

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

  aggregator: TypedContractMethod<[], [string], "view">;

  "amountOf(uint256,uint256,uint8)": TypedContractMethod<
    [value: BigNumberish, maxAge: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;

  "amountOf(uint256,uint8)": TypedContractMethod<
    [value: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;

  amountOfAtPrice: TypedContractMethod<
    [value: BigNumberish, price: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;

  "latestPrice(uint256)": TypedContractMethod<
    [maxAge: BigNumberish],
    [bigint],
    "view"
  >;

  "latestPrice()": TypedContractMethod<[], [bigint], "view">;

  token: TypedContractMethod<[], [string], "view">;

  "valueOf(uint256,uint256,uint8)": TypedContractMethod<
    [amount: BigNumberish, maxAge: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;

  "valueOf(uint256,uint8)": TypedContractMethod<
    [amount: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;

  valueOfAtPrice: TypedContractMethod<
    [amount: BigNumberish, price: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "aggregator"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "amountOf(uint256,uint256,uint8)"
  ): TypedContractMethod<
    [value: BigNumberish, maxAge: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "amountOf(uint256,uint8)"
  ): TypedContractMethod<
    [value: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "amountOfAtPrice"
  ): TypedContractMethod<
    [value: BigNumberish, price: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "latestPrice(uint256)"
  ): TypedContractMethod<[maxAge: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "latestPrice()"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "token"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "valueOf(uint256,uint256,uint8)"
  ): TypedContractMethod<
    [amount: BigNumberish, maxAge: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "valueOf(uint256,uint8)"
  ): TypedContractMethod<
    [amount: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "valueOfAtPrice"
  ): TypedContractMethod<
    [amount: BigNumberish, price: BigNumberish, rounding: BigNumberish],
    [bigint],
    "view"
  >;

  filters: {};
}