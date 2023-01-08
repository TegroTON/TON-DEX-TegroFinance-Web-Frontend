import {Pair} from "../ton/dex/api/types";
import {Coins} from "ton3-core";


const pairToPrice = (pair: Pair) => {
    const {
        leftReserved,
        rightReserved,
    } = pair;
    return leftReserved.isZero()
            ? new Coins(0)
            : new Coins(rightReserved).div(leftReserved.toString());
}



export const useCalcPrice = (pairs: Pair[]) => {
    if (pairs.length === 1) {
        return pairToPrice(pairs[0]);
    } else {
        const price0 = pairToPrice(pairs[0]);
        const price1 = pairToPrice(pairs[1]);
        return price1.mul(price0.toString());
    }
}
