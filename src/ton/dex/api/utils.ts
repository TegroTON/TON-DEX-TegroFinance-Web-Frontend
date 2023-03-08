import {Pair, rawToken, Referral, Token, v1Pairs, v1Referral} from "./types";
import {Address, Coins} from "ton3-core";
import * as t from 'io-ts';

const rawTokenTransformer = (token: t.TypeOf<typeof rawToken>): Token => ({
    name: token.name || '',
    symbol: token.symbol || '',
    address: token.address ? new Address(token.address) : Address.NONE,
    image: `/assets/images/token/${(token.symbol || '').toLowerCase()}.png`,
    decimals: token.decimals
});

const v1PairsTransformer = (pairs: t.TypeOf<typeof v1Pairs>): Pair[] => {
    return pairs.map((pair: t.TypeOf<typeof v1Pairs>[number]): Pair => ({
        address: new Address(pair.address),
        leftToken: rawTokenTransformer(pair.base),
        leftReserved: new Coins(pair.reserve.base, {decimals: pair.base.decimals, isNano: true}),
        rightToken: rawTokenTransformer(pair.quote),
        rightReserved: new Coins(pair.reserve.quote, {decimals: pair.quote.decimals, isNano: true}),
        lpSupply: new Coins(pair.liquidity.total_supply, {isNano: true})
    }))
}

const v1ReferralTransformer = (referrals: t.TypeOf<typeof v1Referral>): Referral[] => {
    return referrals.map((referral: t.TypeOf<typeof v1Referral>[number]): Referral => ({
        address: new Address(referral.address, {bounceable: true, testOnly: false}),
        volumeTGR: new Coins(referral.volume_tgr),
        invited: referral.invited
    }))
}

const pairsSorter = (a: Pair, b: Pair) => {
    if (a.leftReserved.lt(b.leftReserved)) {
        return 1;
    } else if (a.leftReserved.gt(b.leftReserved)) {
        return -1;
    } else {
        return 0;
    }
}

const referralsSorter = (a: Referral, b: Referral) => {
    if (a.volumeTGR.lt(b.volumeTGR)) {
        return 1;
    } else if (a.volumeTGR.gt(b.volumeTGR)) {
        return -1;
    } else {
        return 0;
    }
}


export {
    rawTokenTransformer,
    v1PairsTransformer,
    v1ReferralTransformer,
    pairsSorter,
    referralsSorter
}
