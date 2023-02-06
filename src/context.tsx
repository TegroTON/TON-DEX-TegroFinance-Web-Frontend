import React, { useContext, useEffect, useState } from 'react';
import {Address, Coins} from 'ton3-core';
import {
    PairData, PoolPosition, PoolPositions, StartPair, SwapData, SwapParams, SwapWallets,
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
import {getPairs, getReferrals} from './ton/dex/api/methods';
import { DeLabContext, DeLabContextType } from './deLabContext';
import {Pair, Referral, Token} from './ton/dex/api/types';
import storage from "./storage";


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
    startPair: StartPair;
    setStartPair: (x: StartPair) => void;
    referral: Address | null;
    setReferral: (x: Address | null) => void;
    referrals: Referral[];
};

export const DexContext = React.createContext<DexContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const DexContextProvider: React.FC<Props> = ({ children }) => {
    const [updateLock, setUpdateLock] = React.useState<boolean>(true);
    const [poolParams, setPoolParams] = React.useState<SwapParams>(getDefaultSwapParams());

    const [slippage, setSlippage] = React.useState(storage.slippage.get());

    const [pairs, setPairs] = React.useState<Pair[]>(getDefaultPairs());
    const [tokens, setTokens] = React.useState<Token[]>(getDefaultTokens());

    const [referral, setReferral] = React.useState<Address | null>(storage.referral.get());
    const [referrals, setReferrals] = React.useState<Referral[]>([]);

    useEffect(() => { storage.referral.set(referral) }, [referral])
    useEffect(() => { storage.slippage.set(slippage) }, [slippage])

    // ========== SWAP PARAMS ==========
    const [startPair, setStartPair] = useState<StartPair>(null);

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

    const updatePoolPair = async ({ newPair, updateBalances = true }: { newPair?: Pair, updateBalances?: boolean}) => {
        console.log("update pool pair")
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
        if (updateBalances) {
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

    const trySetPair = async () => {
        if (startPair) {
            setUpdateLock(true);
            const {from, to} = startPair;
            if ((!from || Address.isValid(from)) && (!to || Address.isValid(to))) {
                let token1 = tokens?.find((t) => addrToStr(t.address) === addrToStr(from ? new Address(from) : null));
                let token2 = tokens?.find((t) => addrToStr(t.address) === addrToStr(to ? new Address(to) : null));

                if (token1 && token2) {
                    setStartPair(null);

                    setLeftSwapToken(token1);
                    setRightSwapToken(token2);
                    setSwapWallets({
                        left: {
                            wallet: null,
                            balance: new Coins(0, {decimals: token1.decimals}),
                        },
                        right: {
                            wallet: null,
                            balance: new Coins(0, {decimals: token2.decimals}),
                        }
                    });
                    setLeftSwapAmount(new Coins(0, {decimals: token1.decimals}));
                    setRightSwapAmount(new Coins(0, {decimals: token2.decimals}));

                    setNeedUpdateSwapPairs(true);
                }
            } else {
                setStartPair(null);
            }
        }
    }

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

    const updatePoolPositions = async (force = false) => {
        if (walletInfo.isConnected && walletInfo.address) {
            if (force || poolPositions.length !== pairs.length) {
                console.log(force, poolPositions.length, pairs.length)
                const poolPos = pairs.map(async (p: Pair): Promise<PoolPosition> => {
                    const lpWallet = await tonClient.Jetton.getWalletAddress(p.address, walletInfo.address);
                    return {
                        pair: p.address,
                        lpWallet,
                        lpBalance: await getJettonBalance(lpWallet),
                    };
                });
                const positions = await Promise.all(poolPos);
                setPoolPositions(positions.sort((a: PoolPosition, b: PoolPosition) => {
                    if (a.lpBalance.lt(b.lpBalance)) return 1;
                    else if (a.lpBalance.gt(b.lpBalance)) return -1;
                    else return 0;
                }));
            }
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
            const outAmount = new Coins(rightSwapAmount, {decimals: 18})
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
        const waitLeftWallet = !leftSwapToken.address ? walletInfo.address : tonClient.Jetton.getWalletAddress(leftSwapToken.address, walletInfo.address);
        const waitRightWallet = !rightSwapToken.address ? walletInfo.address : tonClient.Jetton.getWalletAddress(rightSwapToken.address, walletInfo.address);

        const [leftUserWallet, rightUserWallet] = await Promise.all([waitLeftWallet, waitRightWallet]);

        return {...swapWallets,
            left: {
                ...swapWallets.left,
                wallet: leftUserWallet,
            },
            right: {
                ...swapWallets.right,
                wallet: rightUserWallet,
            }
        }
    }

    const updateSwapBalances = async () => {
        console.log('update swap balances')
        const waitLeftBalance = leftSwapToken.symbol === "TON" ? walletInfo.balance : swapWallets.left.wallet ? getJettonBalance(swapWallets.left.wallet) : null;
        const waitRightBalance = rightSwapToken.symbol === "TON" ? walletInfo.balance : swapWallets.right.wallet ? getJettonBalance(swapWallets.right.wallet) : null;

        const [leftUserBalance, rightUserBalance] = await Promise.all([waitLeftBalance, waitRightBalance]);

        if (!(leftUserBalance && rightUserBalance)) return swapWallets;

        return {...swapWallets, left: {...swapWallets.left, balance: leftUserBalance}, right: {...swapWallets.right, balance: rightUserBalance}};
    }

    // useEffect(() => {
    //     updatePoolPair({})
    //         .then();
    //     return () => {};
    // }, [walletInfo.address, walletInfo.isConnected, pairs]);

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
        let tokens = getTokensFromPairs(pairs);
        // const gagarin = new Address("EQDetcmWrfHLPRPVh3LoFvwso0zsjFnpmmXTKWj7s1ycNgu2");
        // const gagarinAdmin = new Address("EQDetcmWrfHLPRPVh3LoFvwso0zsjFnpmmXTKWj7s1ycNgu2");
        // if (!walletInfo.isConnected || !walletInfo.address.eq(gagarinAdmin)) {
        //     tokens = tokens.filter((t: Token) => (!t.address || !t.address.eq(gagarin)));
        // }
        setTokens(tokens);
    };
    const updatePairs = async () => {
        setPairs(await getPairs());
    };

    useEffect(() => {
        let mounted = true;
        if (walletInfo.isConnected) {
            getReferrals(walletInfo.address).then(x => { if (mounted) setReferrals(x as Referral[]) })
        } else {
            setReferrals([]);
        }
        return () => { mounted = false };
    }, [walletInfo.address])

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
        trySetPair();
        updatePoolPair({updateBalances: false})
        return () => {};
    }, [tokens])

    useEffect(() => {
        updateSwapPairs();
        return () => {};
    }, [needUpdateSwapPairs, pairs]);


    useEffect(() => {
        updateTokens();
        updatePoolPositions();
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
            poolPositions: poolPositions.filter((p: PoolPosition) => (!p.lpBalance.isZero())),
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
            swapWallets,
            setStartPair,
            startPair,
            referral,
            setReferral,
            referrals
        }}
        >
            {children}
        </DexContext.Provider>
    );
};
