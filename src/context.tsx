import React, { useContext, useEffect, useState } from 'react';
import {Address, Coins} from 'ton3-core';
import {
    PairData, PoolPosition, PoolPositions, SwapData, SwapParams, SwapWallets,
} from './types';
import {
    getDefaultPairData,
    getDefaultPairs,
    getDefaultSwapParams,
    getDefaultTokens,
    getJettonBalance, getTGRToken, getTONToken,
} from './ton/utils';
import { tonClient } from './ton';
import {
    addrToStr,
    calcInAmountAndPriceImpact,
    calcOutAmountAndPriceImpact,
    getPairByTokens,
    getTokensFromPairs
} from './ton/dex/utils';
import {getPairs} from './ton/dex/api/methods';
import { DeLabContext, DeLabContextType } from './deLabContext';
import {Pair, Token} from './ton/dex/api/types';


export type DexContextType = {
    updateLock: boolean,
    pairs: Pair[];
    tokens: Token[];
    swapLeft: SwapData;
    swapRight: SwapData;
    swapPairs: Pair[];
    setLeftSwapAmount: (x: Coins) => void;
    setRightSwapAmount: (x: Coins) => void;
    extract: boolean;
    setExtract: (x: boolean) => void;
    priceImpact: number;
    updateSwapParams: () => void;
    poolPair: PairData;
    poolParams: SwapParams;
    updatePoolParams: (newPoolParams: SwapParams) => void;

    poolPositions: PoolPositions;
    walletInfo: DeLabContextType | null;
    updatePoolPair: ({
        newPair,
    }: {
        newPair?: Pair
    }) => void

    updateSwap: ({ side, address }: {side?: ('left' | 'right'), address: Address | null}) => void;

    updateSlippage: (newSlippage: number) => void;
    updatePoolPositions: () => void;

    slippage: number;
    switchSwap: () => void;
    setRemovePosition: (x: PoolPosition | null) => void;
    removePosition: PoolPosition | null;
    swapWallets: SwapWallets;
};

export const DexContext = React.createContext<DexContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const DexContextProvider: React.FC<Props> = ({ children }) => {
    const [updateLock, setUpdateLock] = React.useState<boolean>(true);
    const [poolParams, setPoolParams] = React.useState<SwapParams>(getDefaultSwapParams());

    const [slippage, setSlippage] = React.useState(5.0);

    const [pairs, setPairs] = React.useState<Pair[]>(getDefaultPairs());
    const [tokens, setTokens] = React.useState<Token[]>(getDefaultTokens());

    // ========== SWAP PARAMS ==========
    const [leftSwapToken, setLeftSwapToken] = React.useState(getTONToken());
    const [leftSwapAmount, setLeftSwapAmount] = React.useState(new Coins(0));

    const [swapWallets, setSwapWallets] = React.useState<SwapWallets>({left: {wallet: null, balance: new Coins(0)}, right: {wallet: null, balance: new Coins(0)}});

    const swapLeft = {
        token: leftSwapToken,
        userWallet: swapWallets.left.wallet,
        userBalance: swapWallets.left.balance,
        amount: leftSwapAmount
    }

    const [rightSwapToken, setRightSwapToken] = React.useState(getTGRToken());
    const [rightSwapAmount, setRightSwapAmount] = React.useState(new Coins(0));
    const swapRight = {
        token: rightSwapToken,
        userWallet: swapWallets.right.wallet,
        userBalance: swapWallets.right.balance,
        amount: rightSwapAmount
    }

    const [extract, setExtract] = React.useState(false);
    const [priceImpact, setPriceImpact] = useState(0);

    // Route if swapPairs.length === 2
    const [swapPairs, setSwapPairs] = React.useState<Pair[]>(getDefaultPairs());
    const isRoute = swapPairs.length === 2;


    const [poolPair, setPoolPair] = React.useState<PairData>(getDefaultPairData());

    const [poolPositions, setPoolPositions] = React.useState<PoolPositions>([]);

    const walletInfo = useContext(DeLabContext) as DeLabContextType;

    const [needUpdateSwapPairs, setNeedUpdateSwapPairs] = React.useState<boolean>(false);

    const updatePoolPair = async ({ newPair, }: { newPair?: Pair }) => {
        let newXXXPair = poolPair;

        if (newPair) {
            newXXXPair = {
                ...newXXXPair,
                leftToken: newPair.leftToken,
                rightToken: newPair.rightToken,
                address: newPair.address,
            }
        }

        let {
            leftToken,
            rightToken,
            rightBalance,
            leftBalance,
            leftWallet,
            rightWallet,
        } = newXXXPair;

        // const selectedLeft = typeof newSelectedLeft !== "undefined" ? newSelectedLeft : swapInfo.selected.left
        // const selectedRight = typeof newSelectedRight !== "undefined" ? newSelectedRight : swapInfo.selected.right

        // надо обновить адрес кошелька, баланс, резерв
        if (walletInfo.isConnected && walletInfo.address) {
            leftWallet = !leftToken.address ? null : await tonClient.Jetton.getWalletAddress(leftToken.address, walletInfo.address);
            rightWallet = !rightToken.address ? null : await tonClient.Jetton.getWalletAddress(rightToken.address, walletInfo.address);
            leftBalance = leftWallet ? await getJettonBalance(leftWallet) : null;
            rightBalance = rightWallet ? await getJettonBalance(rightWallet) : null;
        } else {
            leftWallet = null;
            rightWallet = null;
            leftBalance = null;
            rightBalance = null;
        }

        const {
            leftReserved,
            rightReserved,
        } = getPairByTokens(pairs, leftToken.address, rightToken.address);

        // console.log('left', leftReserved.toString(), 'right', rightReserved.toString());

        newXXXPair = {
            ...newXXXPair,
            leftWallet,
            rightWallet,
            leftBalance,
            rightBalance,
            leftReserved,
            rightReserved,
        };
        // saveSwapInfo({ swapParams, pair: newSwapPair });
        setPoolPair(newXXXPair);
    };

    const switchSwap = () => {
        if (updateLock) return;
        setUpdateLock(true);
        const tempLeft = leftSwapToken;
        const tempRight = rightSwapToken;

        setSwapWallets({
            left: {
                wallet: null,
                balance: new Coins(0, {decimals: tempRight.decimals}),
            },
            right: {
                wallet: null,
                balance: new Coins(0, {decimals: tempLeft.decimals}),
            }
        });

        setLeftSwapToken(tempRight);
        setRightSwapToken(tempLeft);

        setLeftSwapAmount(new Coins(0, {decimals: tempRight.decimals}));
        setRightSwapAmount(new Coins(0, {decimals: tempLeft.decimals}));

        setNeedUpdateSwapPairs(true);
    }

    // const tryInstallPair = async (left: string | null, right: string | null) => {
    //     // pass
    // }

    const updateSwap = async ({ side, address }: {side?: ('left' | 'right'), address: Address | null}) => {
        setUpdateLock(true);
        const [leftToken, rightToken] = side && side === 'right' ? [rightSwapToken, leftSwapToken] : [leftSwapToken, rightSwapToken];

        let token = tokens?.find((t) => addrToStr(t.address) === addrToStr(address));
        if (token && addrToStr(token.address) === addrToStr(rightToken.address)) {
            switchSwap();
            return;
        }
        token = token === undefined || addrToStr(token.address) === addrToStr(rightToken.address) ? getTONToken() : token;
        token = addrToStr(token.address) === addrToStr(rightToken.address) ? getTGRToken() : token;

        if (side === 'left') {
            setLeftSwapToken(token);
            setSwapWallets({
                left: {
                    wallet: null,
                    balance: new Coins(0, {decimals: token.decimals}),
                },
                right: {
                    wallet: null,
                    balance: new Coins(0, {decimals: rightSwapToken.decimals}),
                }
            });
            setLeftSwapAmount(new Coins(0, {decimals: token.decimals}));
            setRightSwapAmount(new Coins(0, {decimals: rightSwapToken.decimals}));
        } else {
            setRightSwapToken(token);
            setSwapWallets({
                left: {
                    wallet: null,
                    balance: new Coins(0, {decimals: leftSwapToken.decimals}),
                },
                right: {
                    wallet: null,
                    balance: new Coins(0, {decimals: token.decimals}),
                }
            });
            setLeftSwapAmount(new Coins(0, {decimals: leftSwapToken.decimals}));
            setRightSwapAmount(new Coins(0, {decimals: token.decimals}));
        }
        setNeedUpdateSwapPairs(true);
    }

    const updateSwapPairs = async () => {
        if (!leftSwapToken.address || !rightSwapToken.address) {
            const pair1 = getPairByTokens(pairs, leftSwapToken.address, rightSwapToken.address);
            setSwapPairs([pair1])
        } else {
            const pair1 = getPairByTokens(pairs, leftSwapToken.address, null);
            const pair2 = getPairByTokens(pairs, null, rightSwapToken.address);
            setExtract(false);
            setSwapPairs([pair1, pair2]);
        }
        setNeedUpdateSwapPairs(false);
    }

    const updateSlippage = (newSlippage: number) => {
        setSlippage(newSlippage < 0.1 ? 0.1 : newSlippage > 99.6 ? 99.6 : newSlippage);
    };

    const updatePoolParams = (newPoolParams: SwapParams) => {
        setPoolParams(newPoolParams);
    };

    const updatePoolPositions = async () => {
        if (walletInfo.isConnected && walletInfo.address) {
            const poolPos = pairs.map(async (p: Pair): Promise<PoolPosition> => {
                const lpWallet = await tonClient.Jetton.getWalletAddress(p.address, walletInfo.address);
                return {
                    pair: p.address,
                    lpWallet,
                    lpBalance: await getJettonBalance(lpWallet),
                };
            });
            const positions = await Promise.all(poolPos);
            setPoolPositions(positions.filter((p: PoolPosition) => (!p.lpBalance.isZero())));
        } else {
            setPoolPositions([]);
        }
    };

    // const updateWallet = async (side: ('left' | 'right')) => {
    //     if (side === "left") {
    //         const leftUserWallet = !leftSwapToken.address ? walletInfo.address : await tonClient.Jetton.getWalletAddress(leftSwapToken.address, walletInfo.address);
    //         setLeftUserWallet(leftUserWallet);
    //     } else {
    //         const rightUserWallet = !rightSwapToken.address ? walletInfo.address : await tonClient.Jetton.getWalletAddress(rightSwapToken.address, walletInfo.address);
    //         setRightUserWallet(rightUserWallet);
    //     }
    // }

    // const updateWallets = async () => {
    //     await Promise.all([updateWallet('left'), updateWallet('right'), console.log('hello motherfucker')])
    // }

    // const updateBalance = async (side: ('left' | 'right')) => {
    //     try {
    //         if (side === "left") {
    //             const leftUserBalance = leftSwapToken.symbol === "TON" ? walletInfo.balance : leftUserWallet ? getJettonBalance(leftUserWallet) : null;
    //             if (!leftUserBalance) throw "unknown balance";
    //             setLeftUserBalance(await leftUserBalance);
    //         } else {
    //             const rightUserBalance = rightSwapToken.symbol === "TON" ? walletInfo.balance : rightUserWallet ? getJettonBalance(rightUserWallet) : null;
    //             if (!rightUserBalance) throw "unknown balance";
    //             setRightUserBalance(await rightUserBalance);
    //         }
    //     } catch {
    //         await updateWallet(side);
    //     }
    // }

    // const updateBalances = async () => {
    //     await Promise.all([updateBalance('left'), updateBalance('right'), console.log('hello brainfucker')]);
    // }

    const updateSwapParams = () => {
        if (extract) {
            const outAmount = new Coins(rightSwapAmount)
            const [inAmount, priceImpact] = calcInAmountAndPriceImpact(outAmount, swapPairs[0]);
            setPriceImpact(priceImpact);
            setLeftSwapAmount(inAmount);
        } else {
            const inAmount = new Coins(leftSwapAmount)
            if (inAmount.isZero() || swapPairs.length < 1 || swapPairs[0].leftReserved.isZero()) {
                setPriceImpact(0);
                setRightSwapAmount(new Coins(0, {decimals: rightSwapToken.decimals}))
            } else {
                const [outAmount, priceImpact] = calcOutAmountAndPriceImpact(inAmount, swapPairs);
                setPriceImpact(priceImpact); // price_impact_trade_cake = amountInCAKE / (reserve_a_initial + amountInCAKE);
                setRightSwapAmount(outAmount);
            }
        }
    }

    const updateSwapWallets = async (): Promise<SwapWallets> => {
        const leftUserWallet = !leftSwapToken.address ? walletInfo.address : tonClient.Jetton.getWalletAddress(leftSwapToken.address, walletInfo.address);
        const rightUserWallet = !rightSwapToken.address ? walletInfo.address : tonClient.Jetton.getWalletAddress(rightSwapToken.address, walletInfo.address);

        return {...swapWallets,
            left: {
                ...swapWallets.left,
                wallet: await leftUserWallet,
            },
            right: {
                ...swapWallets.right,
                wallet: await rightUserWallet,
            }
        }
    }

    const updateSwapBalances = async () => {
        const leftUserBalance = leftSwapToken.symbol === "TON" ? walletInfo.balance : swapWallets.left.wallet ? getJettonBalance(swapWallets.left.wallet) : null;
        const rightUserBalance = rightSwapToken.symbol === "TON" ? walletInfo.balance : swapWallets.right.wallet ? getJettonBalance(swapWallets.right.wallet) : null;
        if (!(await leftUserBalance && await rightUserBalance)) return swapWallets;
        return {...swapWallets, left: {...swapWallets.left, balance: await leftUserBalance}, right: {...swapWallets.right, balance: await rightUserBalance}};
    }

    useEffect(() => {
        updatePoolPair({})
            .then();
        return () => {};
    }, [walletInfo.address, walletInfo.isConnected, pairs]);

    const [lastBalance, setLastBalance] = useState<Coins>(new Coins(0));
    useEffect(() => {
        if (!(lastBalance.eq(walletInfo.balance))) {
            setLastBalance(walletInfo.balance);
            updatePoolPair({})
                .then();
        }
        return () => {};
    }, [walletInfo.balance]);

    const updateTokens = async () => {
        setTokens(getTokensFromPairs(pairs));
    };
    const updatePairs = async () => {
        setPairs(await getPairs());
    };

    useEffect(() => {
        let mounted = true;
        updateSwapBalances().then(x => { if (mounted) { setSwapWallets(x as SwapWallets); setUpdateLock(false); }});
        return () => { mounted = false };
    }, [swapWallets.left.wallet, swapWallets.right.wallet]);

    useEffect(() => {
        let mounted = true;
        updateSwapWallets().then(x => { if (mounted) { setSwapWallets(x) }});
        return () => { mounted = false };
    }, [swapPairs]);


    useEffect(() => {
        updateSwapPairs();
        return () => {};
    }, [needUpdateSwapPairs, pairs]);


    useEffect(() => {
        updateTokens();
        return () => {};
    }, [pairs]);

    useEffect(() => {
        updatePairs();
        const interval = setInterval(updatePairs, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!extract) { updateSwapParams() }
        return () => {};
    }, [swapPairs, leftSwapAmount]);

    useEffect(() => {
        if (extract) { updateSwapParams() }
        return () => {};
    }, [swapPairs, rightSwapAmount]);

    const [removePosition, setRemovePosition] = React.useState<PoolPosition | null>(null);

    return (
        <DexContext.Provider value={{
            updateLock,
            pairs,
            tokens,
            swapLeft,
            swapRight,
            setLeftSwapAmount,
            setRightSwapAmount,
            extract,
            setExtract,
            updateSwapParams,
            priceImpact,
            swapPairs,
            poolPair,
            poolPositions,
            walletInfo,
            updateSlippage,
            updateSwap,
            updatePoolPositions,
            poolParams,
            updatePoolPair,
            updatePoolParams,
            slippage,
            switchSwap,
            removePosition,
            setRemovePosition,
            swapWallets
        }}
        >
            {children}
        </DexContext.Provider>
    );
};
