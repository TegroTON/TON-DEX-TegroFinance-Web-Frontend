import {Pair} from "../ton/dex/api/types";

export const UsePrintRoute = (ops: {pairs: Pair[]}) => {
    const {pairs} = ops;
    return (<>{`${pairs[0].leftToken.symbol} > ${pairs[0].rightToken.symbol}${pairs.length === 2 ? " > " + pairs[1].rightToken.symbol + " (beta)" : ''}`}</>);
}
