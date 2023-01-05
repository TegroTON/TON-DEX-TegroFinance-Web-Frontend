// import { Pair, JettonMeta } from '../../../types';

import { Address, Coins } from 'ton3-core';

export type Token = {
    // updated: number,
    name: string,
    symbol: string,
    address: Address,
    image: string,
    decimals: number,
    // supply: string,
    // description: string
};

export type Pair = {
    // updated: number,
    address: Address,
    // leftName: string,
    // leftSymbol: string,
    leftToken: Address,
    leftReserved: Coins,
    // rightName: string,
    // rightSymbol: string,
    rightToken: Address,
    rightReserved: Coins,
    lpSupply: Coins,
};

export type Pairs = Pair[];

export type Tokens = Token[];
