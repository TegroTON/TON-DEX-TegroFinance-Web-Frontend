import {Address, Coins} from 'ton3-core';
// import { JettonInfo, Pair } from '../../types';
import {tonClient} from '../index';
import {Pair, Token} from './api/types';
import {getDefaultPairs} from "../utils";
export const addrToStr = (addr: Address | null) => (addr ? addr.toString("raw") : '')

export const getPairByTokens = (pairs: Pair[], token1: Address | null, token2: Address | null): Pair => {
    const strToken1 = addrToStr(token1);
    const strToken2 = addrToStr(token2);
    const pair = pairs.find((p) => (((addrToStr(p.leftToken.address) === strToken1) && (addrToStr(p.rightToken.address) === strToken2)) || ((addrToStr(p.leftToken.address) === strToken2) && (addrToStr(p.rightToken.address) === strToken1))));

    if (!pair) return getDefaultPairs()[0];

    if (addrToStr(pair.leftToken.address) === strToken1) {
        return pair;
    }
    return {...pair,
        leftToken: pair.rightToken,
        leftReserved: pair.rightReserved,
        rightToken: pair.leftToken,
        rightReserved: pair.leftReserved,
    };
};

export const getTokensFromPairs = (pairs: Pair[]) => {
    let tokens: Token[] = [];
    for (const pair of pairs) {
        const {leftToken: t1, rightToken: t2} = pair;
        if (!tokens.find((t) => (addrToStr(t.address) === addrToStr(t1.address)))) {
            tokens.push(t1);
        }
        if (!tokens.find((t) => (addrToStr(t.address) === addrToStr(t2.address)))) {
            tokens.push(t2);
        }

    }
    return tokens;
}

export const getLPSupply = async (pairAddress: string): Promise<Coins> => {
    const { totalSupply } = await tonClient.Jetton.getData(new Address(pairAddress));
    return new Coins(totalSupply, { isNano: true });
};
//
// export function getDefaultPair(): Pair {
//     const right = getDefaultJetton();
//     return {
//         address: 'EQBpLTnl0mciLdS52V6-Eh7h5TX4ivz-jOzVQoXI9ibHy9_i',
//         left: null,
//         right,
//         leftReserve: new Coins(0),
//         rightReserve: new Coins(0),
//         lpSupply: new Coins(0),
//     };
// }
//
// export const getPairInfo = async (leftSymbol: string, rightSymbol: string): Promise<{ address: string | null, leftReserve: Coins, rightReserve: Coins }> => {
//     let address;
//     let leftReserve;
//     let rightReserve;
//     try {
//         const pairMeta = await getPair(leftSymbol, rightSymbol);
//         address = pairMeta.address;
//         leftReserve = new Coins(pairMeta.leftReserved, { isNano: true });
//         rightReserve = new Coins(pairMeta.rightReserved, { isNano: true });
//     } catch {
//         // pass
//     }
//     return { address: address ?? null, leftReserve: leftReserve ?? new Coins(0), rightReserve: rightReserve ?? new Coins(0) };
// };
//
// export const getJettonInfo = async (symbol: string): Promise<JettonInfo | null> => {
//     const token = await getToken(symbol);
//     return symbol === 'TON' ? null : { jetton: { address: token.address, meta: TokenToJettonMeta(token) }, wallet: {}, balance: new Coins(0) };
// };
//
// export const getPairBySymbol = async (leftSymbol: string, rightSymbol: string): Promise<Pair> => {
//     const { address, leftReserve, rightReserve } = await getPairInfo(leftSymbol, rightSymbol);
//     if (!address) throw Error('PAIR NOT VALID'); // TODO запилить функцию выбора другой пары
//     return {
//         address,
//         left: await getJettonInfo(leftSymbol),
//         right: await getJettonInfo(rightSymbol),
//         leftReserve,
//         rightReserve,
//         lpSupply: await getLPSupply(address),
//     };
// };
//
// export const getValidPair = async (left: JettonInfo | null, right: JettonInfo | null): Promise<Pair> => {
//     const { address, leftReserve, rightReserve } = await getPairInfo(left ? left.jetton.meta.symbol : 'TON', right ? right.jetton.meta.symbol : 'TON');
//     if (!address) throw Error('PAIR NOT VALID'); // TODO запилить функцию выбора другой пары
//     return {
//         address,
//         left,
//         right,
//         leftReserve,
//         rightReserve,
//         lpSupply: await getLPSupply(address),
//     };
// };

const round = (x: number, d: number) => {
    return Math.round(x * 10 ** d) / 10 ** d;
}
export const CoinsToDecimals = (x: Coins, d: number): Coins => {
    return new Coins(round(Number(x.toString()), d), {decimals: d});
}

export const getOutAmount = (inAmount: Coins, inReserved: Coins, outReserved: Coins): Coins => {
    const inAmountWithFee = new Coins(inAmount).mul(996);
    const numerator = new Coins(inAmountWithFee).mul(outReserved.toString());
    const denominator = new Coins(inReserved).mul(1000)
        .add(inAmountWithFee);
    return numerator.div(denominator.toString());
};

export const calcOutAmountAndPriceImpact = (inAmount: Coins, pairs: Pair[]): [Coins, number] => {
    const isRoute = pairs.length === 2;
    if (isRoute) {
        const out1 = getOutAmount(inAmount, pairs[0].leftReserved, pairs[0].rightReserved);
        const out1D = CoinsToDecimals(out1, pairs[0].rightToken.decimals);
        const outAmount = getOutAmount(out1D, pairs[1].leftReserved, pairs[1].rightReserved);
        const priceImpact1 = new Coins(inAmount).div(new Coins(pairs[0].leftReserved).add(inAmount).toString()).mul(100);
        const priceImpact2 = new Coins(out1D).div(new Coins(pairs[1].leftReserved).add(out1D).toString()).mul(100);
        const priceImpact = Number(new Coins(priceImpact1).add(priceImpact2).toString());
        // const priceImpact = Number(new Coins(inAmount).mul(out1.toString()).div(new Coins(pairs[0].leftReserved).mul(pairs[1].leftReserved.toString()).add(new Coins(inAmount).mul(out1.toString())).toString()).mul(100).toString());
        return [CoinsToDecimals(outAmount, pairs[1].rightToken.decimals), priceImpact]
    } else {
        const outAmount = getOutAmount(inAmount, pairs[0].leftReserved, pairs[0].rightReserved);
        const priceImpact = Number(new Coins(inAmount).div(new Coins(pairs[0].leftReserved).add(inAmount).toString()).mul(100).toString());
        return [CoinsToDecimals(outAmount, pairs[0].rightToken.decimals), priceImpact]
    }
}

export const getInAmount = (outAmount: Coins, inReserved: Coins, outReserved: Coins): Coins => {
    const numerator = new Coins(inReserved).mul(outAmount.toString()).mul(1000);
    const denominator = new Coins(outReserved).sub(outAmount).mul(996)
    return numerator.div(denominator.toString())
}

export const calcInAmountAndPriceImpact = (outAmount: Coins, pair: Pair): [Coins, number] => {
    const inAmount = getInAmount(outAmount, pair.leftReserved, pair.rightReserved);
    const priceImpact = Number(new Coins(outAmount).div(new Coins(pair.rightReserved).sub(outAmount).toString()).mul(100).toString());
    return [CoinsToDecimals(inAmount, pair.leftToken.decimals), priceImpact]
}

export const getStakeAmount = (inAmount: Coins, inReserved: Coins, outReserved: Coins): Coins => {
    const numerator = new Coins(inAmount).mul(outReserved.toString());
    const denominator = new Coins(inReserved).add(inAmount);
    return numerator.div(denominator.toString());
};
