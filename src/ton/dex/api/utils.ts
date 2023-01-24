import {Pair, RawPair, RawToken, Token} from "./types";
import {Address, Coins} from "ton3-core";

const rawTokenTransformer = (token: RawToken): Token => ({
    name: token.name,
    symbol: token.symbol || '',
    address: token.address ? new Address(token.address) : Address.NONE,
    image: `/assets/images/token/${(token.symbol || '').toLowerCase()}.png`,
    decimals: token.decimals
});

const rawPairTransformer = (pair: RawPair): Pair => ({
    address: new Address(pair.address),
    leftToken: rawTokenTransformer(pair.base),
    leftReserved: new Coins(pair.reserve.base, {decimals: pair.base.decimals, isNano: true}),
    rightToken: rawTokenTransformer(pair.quote),
    rightReserved: new Coins(pair.reserve.quote, {decimals: pair.quote.decimals, isNano: true}),
    lpSupply: new Coins(pair.liquidity.total_supply, {isNano: true})
});

export {
    rawPairTransformer,
    rawTokenTransformer
}
