import {Pair, v1Pairs, v2Reserves, v1Referral, Referral} from "./types";
import {pairsSorter, referralsSorter, v1PairsTransformer, v1ReferralTransformer} from "./utils";
import {Endpoint} from "./endpoint";
import {Address} from "ton3-core";


class DexApi {
    private readonly host = "https://api.tegro.finance";

    public v1 = {
        pairs: new Endpoint(`${this.host}/v1/pairs`, {
            schema: v1Pairs,
            transformer: v1PairsTransformer
        }),
        referral: new Endpoint(`${this.host}/v1/referral`, {
            schema: v1Referral,
            transformer: v1ReferralTransformer
        }),
    }

    // public v2 = {
    //     reserves: new Endpoint(`${this.host}/v2/reserves`, {
    //         schema: v2Reserves,
    //         transformer: v2ReservesTransformer
    //     })
    // }

}

const api = new DexApi()


export const getPairs = async (): Promise<Pair[]> => {
    const pairs = await api.v1.pairs.get();
    return pairs.sort(pairsSorter);
}

export const getReferrals = async (user: Address): Promise<Referral[]> => {
    const referrals = await api.v1.referral.get([user.toString("raw")]);
    return referrals.sort(referralsSorter);
}
