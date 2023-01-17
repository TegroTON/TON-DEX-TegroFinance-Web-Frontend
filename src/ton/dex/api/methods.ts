import axios from "axios";
import {Address, Coins} from "ton3-core";
import {RawToken, Token, RawPair, Pair, IPair} from "./types";
import {rawPairTransformer} from "./utils";

const endpoint = 'https://bbau9qdvvsk12nknl37j.containers.yandexcloud.net/v1';

const getPairs = async (): Promise<Pair[]> => {
    const url = `${endpoint}/pair`;
    const res = await axios.get(url);
    if (res.status !== 200) {
        throw Error(`Received error: ${JSON.stringify(res.data || {})}`);
    }
    return (res.data as RawPair[]).map((rawPair: RawPair) => rawPairTransformer(rawPair));
}

const getPair = async ({base, quote}: IPair): Promise<Pair> => {
    const url = `${endpoint}/pair/token/${base ? base.toString("raw") : base}/${quote ? quote.toString("raw") : quote}`;
    const res = await axios.get(url);
    if (res.status !== 200) {
        throw Error(`Received error: ${JSON.stringify(res.data || {})}`);
    }
    return rawPairTransformer(res.data as RawPair);
}

// const test = async () => {
//     console.log(await getPairs());
// }
//
// test();

export {
    getPair,
    getPairs,
}
