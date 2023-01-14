// import { Coins } from 'ton3-core';

// console.log(1);
// export function saveSwapInfo(swapInfo: SwapInfo) {
//     const pair: any = (JSON.parse(JSON.stringify(swapInfo.pair)));
//     if (pair.left !== null) delete pair.left.balance;
//     if (pair.right !== null) delete pair.right.balance;
//     if (pair.leftReserve) delete pair.leftReserve;
//     if (pair.rightReserve) delete pair.rightReserve;
//     localStorage.setItem('slippage', JSON.stringify(swapInfo.swapParams.slippage));
//     localStorage.setItem('pair', JSON.stringify(pair));
// }
//
// export function loadSwapInfo(): SwapInfo {
//     const slippage = localStorage.getItem('slippage');
//     const parseSlippage = slippage && slippage !== 'NaN' ? parseFloat(slippage) : 0.5;
//     const normSlippage = parseSlippage > 99.7 ? 99.7 : parseSlippage < 0.1 ? 0.1 : parseSlippage;
//     const pair = localStorage.getItem('pair');
//     const parsePair = pair ? JSON.parse(pair) : getDefaultPair();
//     if (parsePair.left) parsePair.left.balance = new Coins(0);
//     if (parsePair.right) parsePair.right.balance = new Coins(0);
//     parsePair.leftReserve = new Coins(0);
//     parsePair.leftReserve = new Coins(0);
//
//     const swapInfo = { swapParams: { slippage: normSlippage, inAmount: new Coins(0), outAmount: new Coins(0) }, pair: parsePair } as SwapInfo;
//     saveSwapInfo(swapInfo);
//     return swapInfo;
// }

export const fieldNormalizer = (
    fieldName: string,
    fieldValue: string,
    set: (name: string, x: string) => void,
) => {
    let normValue = fieldValue;
    normValue = normValue.replaceAll(',', '.');
    normValue = normValue.replace(/[^0-9\.]+/g, '');
    normValue = normValue.replace(/^0+/, '0');
    normValue = normValue.replace(/\.+$/, '.');
    normValue = normValue.replace(/^\./, '0.');
    normValue = normValue.replace(/^0(\d+)/, '$1');
    if ((normValue.split('.').length - 1) > 1) {
        normValue = normValue.replace('.', ',');
        normValue = normValue.replaceAll('.', '');
        normValue = normValue.replace(',', '.');
    }
    set(fieldName, normValue);
};

export function isMobile(): boolean {
    return window.innerWidth <= 500;
}

export function openLink(href: string, target = '_self') {
    window.open(href, target, 'noreferrer noopener');
}
