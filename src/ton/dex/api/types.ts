// import { Pair, JettonMeta } from '../../../types';

import { Address, Coins } from 'ton3-core';
import * as t from "io-ts";

type strOrNone = (null | string);
const strOrNone = t.union([t.null, t.string]);


export type RawToken = {
    address: strOrNone;
    timestamp: number;
    total_supply: string;
    mintable: boolean;
    admin: strOrNone;
    contract_timestamp: number;
    name: strOrNone;
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

export type Reserve = {
    pair: Address,
    base: Coins,
    quote: Coins,
}

export type Referral = {
    address: Address,
    volumeTGR: Coins,
    invited: number
}

export const rawToken = t.type({
    address: strOrNone,
    timestamp: t.number,
    total_supply: t.string,
    mintable: t.boolean,
    admin: strOrNone,
    contract_timestamp: t.number,
    name: strOrNone,
    description: strOrNone,
    symbol: strOrNone,
    decimals: t.number,
    metadata_timestamp: t.number
})

export const rawReserve = t.type({
    address: t.string,
    base: t.string,
    quote: t.string,
    timestamp: t.number
})

export const rawPair = t.type({
    address: t.string,
    timestamp: t.number,
    token_timestamp: t.number,
    liquidity: rawToken,
    base: rawToken,
    quote: rawToken,
    reserve: rawReserve
})

export const v1Pairs = t.array(rawPair);

export const v1Referral = t.array(t.type({
    address: t.string,
    volume_tgr: t.string,
    invited: t.number
}));

export const v2Pairs = t.array(t.type({
    liquidity: t.string,
    base: strOrNone,
    quote: strOrNone
}))

export const v2Reserves = t.array(t.type({
    liquidity: t.string,
    base: t.string,
    quote: t.string,
}))
