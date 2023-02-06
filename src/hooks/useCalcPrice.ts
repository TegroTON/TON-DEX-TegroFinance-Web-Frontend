import {Pair} from "../ton/dex/api/types";
import {Coins} from "ton3-core";
import {CoinsToDecimals} from "../ton/dex/utils";


const pairToPrice = (pair: Pair) => {
    const {
        leftReserved,
        rightReserved,
    } = pair;
    return leftReserved.isZero()
            ? new Coins(0)
            : new Coins(rightReserved, {decimals: 18}).div(leftReserved.toString());
}



export const useCalcPrice = (pairs: Pair[]) => {
    if (pairs.length === 1) {
        return CoinsToDecimals(pairToPrice(pairs[0]), pairs[0].leftToken.decimals);
    } else {
        const price0 = pairToPrice(pairs[0]);
        const price1 = pairToPrice(pairs[1]);
        return CoinsToDecimals(price1.mul(price0.toString()), pairs[0].leftToken.decimals);
    }
}
