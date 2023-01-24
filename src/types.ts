import {Address, Coins} from 'ton3-core';
import {Pair, Token} from "./ton/dex/api/types";

export interface LocationParams {
    from: string;
    noBack?: boolean;
    noLang?: boolean;
    data: object;
}

export type SwapData = {
    token: Token
    userWallet: Address | null
    userBalance: Coins
    amount: Coins
};

export type PairData = {
    address: Address;
    leftToken: Token;
    rightToken: Token;
    leftWallet: Address | null;
    rightWallet: Address | null;
    leftBalance: Coins | null
    rightBalance: Coins | null

    leftReserved: Coins;
    rightReserved: Coins
};

export type SwapParams = {
    inAmount: Coins
    outAmount: Coins
};


export type SwapWallets = {
    left: {
        wallet: Address | null,
        balance: Coins
    },
    right: {
        wallet: Address | null,
        balance: Coins
    }
}

export type PoolPosition = {
    pair: Address
    lpWallet: Address
    lpBalance: Coins
};

export type PoolPositions = PoolPosition[]; // key - pairAddress

export type ReferralInfo = {};


export type StartPair = {from: string | null, to: string | null} | null;

