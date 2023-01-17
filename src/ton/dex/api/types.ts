// import { Pair, JettonMeta } from '../../../types';

import { Address, Coins } from 'ton3-core';

type strOrNone = (null | string);

export interface IPair {
    base: Address | null,
    quote: Address | null
}

export type RawToken = {
    address: strOrNone;
    timestamp: number;
    total_supply: string;
    mintable: boolean;
    admin: strOrNone;
    contract_timestamp: number;
    name: string;
    description: strOrNone;
    symbol: strOrNone;
    decimals: number;
    metadata_timestamp: number;
}

export type RawReserve = {
    address: string;
    base: string;
    quote: string;
    timestamp: number;
}

export type RawPair = {
    address: string;
    timestamp: number;
    token_timestamp: number;
    liquidity: RawToken;
    base: RawToken;
    quote: RawToken;
    reserve: RawReserve;
}

export type Token = {
    name: string,
    symbol: string,
    address: Address | null,
    image: string,
    decimals: number,
};

export type Pair = {
    address: Address,
    leftToken: Token,
    leftReserved: Coins,
    rightToken: Token,
    rightReserved: Coins,
    lpSupply: Coins,
};
