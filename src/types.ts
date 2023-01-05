import {Address, Coins} from 'ton3-core';

export interface LocationParams {
    from: string;
    noBack?: boolean;
    noLang?: boolean;
    data: object;
}

export type PairData = {
    address: Address;
    leftToken: Address;
    rightToken: Address;
    leftWallet: Address | null;
    rightWallet: Address | null;
    leftBalance: Coins | null
    rightBalance: Coins | null

    leftReserved: Coins;
    rightReserved: Coins
};

export type SwapParams = {
    slippage: number
    inAmount: Coins
    outAmount: Coins
};

export type PoolPosition = {
    pair: Address
    lpWallet: Address
    lpBalance: Coins
};

export type PoolPositions = PoolPosition[]; // key - pairAddress

export type ReferralInfo = {};
