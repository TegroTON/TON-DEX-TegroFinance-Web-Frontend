import {Address} from "ton3-core";

const rootKey = "tegro.fi";
const key = {
    referral: `${rootKey}:referral`,
    slippage: `${rootKey}:slippage`,
}

const asAddr = (raw: string | null) => {
    if (raw && Address.isValid(raw)) return new Address(raw);
    else return null;
}

const asNum = (raw: string | null) => {
    if (raw) try { return Number(raw); } catch { return null; }
    else return null;
}


export default {
    referral: {
            get(): Address | null {
                return asAddr(localStorage.getItem(key.referral));
            },

            set(ref: Address | null) {
                if (!ref) {
                    localStorage.removeItem(key.referral);
                } else {
                    localStorage.setItem(key.referral, ref.toString("raw"));
                }
            }
    },

    slippage: {
        get(): number {
            const sl = asNum(localStorage.getItem(key.slippage));
            if (!sl) return 5;
            if (sl > 99.6) return 99.6;
            if (sl < 0.1) return 0.1;
            return sl;
        },

        set(sl: number | null) {
            if (!sl) {
                localStorage.removeItem(key.slippage);
            } else {
                localStorage.setItem(key.slippage, sl.toString());
            }
        }
    }
}
