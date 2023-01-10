import React, { useContext, useEffect, useState } from 'react';
import {Address, Coins} from 'ton3-core';
import {
    PairData, PoolPosition, PoolPositions, SwapData, SwapParams,
} from './types';
import {
    getDefaultPair,
    getDefaultPairs,
    getDefaultSwapParams,
    getDefaultTokens,
    getJettonBalance, getTGRToken, getTONToken,
} from './ton/utils';
import { tonClient } from './ton';
import {calcInAmountAndPriceImpact, calcOutAmountAndPriceImpact, getPairByTokens} from './ton/dex/utils';
import {getPair, getPairs, getTokens} from './ton/dex/api/apiClient';
import { DeLabContext, DeLabContextType } from './deLabContext';
import {Pair, Pairs, Tokens} from './ton/dex/api/types';
import { TON_ADDRESS } from './ton/dex/constants';

export type DexContextType = {
    pairs: Pairs;
    tokens: Tokens;
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

    updateSwap: ({ side, symbol }: {side?: ('left' | 'right'), symbol: string}) => void;

    updateSlippage: (newSlippage: number) => void;
    updatePoolPositions: () => void;

    slippage: number;
    switchSwap: () => void;
    setRemovePosition: (x: PoolPosition | null) => void;
    removePosition: PoolPosition | null;
};

export const DexContext = React.createContext<DexContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const DexContextProvider: React.FC<Props> = ({ children }) => {
    const [poolParams, setPoolParams] = React.useState<SwapParams>(getDefaultSwapParams());

    const [slippage, setSlippage] = React.useState(5.0);

    const [pairs, setPairs] = React.useState<Pairs>(getDefaultPairs());
    const [tokens, setTokens] = React.useState<Tokens>(getDefaultTokens());

    // ========== SWAP PARAMS ==========
    const [leftSwapToken, setLeftSwapToken] = React.useState(getTONToken());
    const [leftSwapAmount, setLeftSwapAmount] = React.useState(new Coins(0));
    const [leftUserWallet, setLeftUserWallet] = React.useState(Address.NONE);
    const [leftUserBalance, setLeftUserBalance] = React.useState(new Coins(0));
    const swapLeft = {
        token: leftSwapToken,
        userWallet: leftUserWallet,
        userBalance: leftUserBalance,
        amount: leftSwapAmount
    }

    const [rightSwapToken, setRightSwapToken] = React.useState(getTGRToken());
    const [rightSwapAmount, setRightSwapAmount] = React.useState(new Coins(0));
    const [rightUserWallet, setRightUserWallet] = React.useState(Address.NONE);
    const [rightUserBalance, setRightUserBalance] = React.useState(new Coins(0));
    const swapRight = {
        token: rightSwapToken,
        userWallet: rightUserWallet,
        userBalance: rightUserBalance,
        amount: rightSwapAmount
    }

    const [extract, setExtract] = React.useState(false);
    const [priceImpact, setPriceImpact] = useState(0);

    // Route if swapPairs.length === 2
    const [swapPairs, setSwapPairs] = React.useState<Pairs>([getDefaultPairs()[0]]);
    const isRoute = swapPairs.length === 2;

    const [poolPair, setPoolPair] = React.useState<PairData>(getDefaultPair());

    const [poolPositions, setPoolPositions] = React.useState<PoolPositions>([]);

    const walletInfo = useContext(DeLabContext) as DeLabContextType;

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
            leftWallet = leftToken.address.eq(TON_ADDRESS) ? null : await tonClient.Jetton.getWalletAddress(leftToken.address, walletInfo.address);
            rightWallet = rightToken.address.eq(TON_ADDRESS) ? null : await tonClient.Jetton.getWalletAddress(rightToken.address, walletInfo.address);
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
        const tempLeft = swapLeft;
        const tempRight = swapRight;

        // if (!isRoute) {
        //     setExtract(!extract);
        // }

        setLeftSwapToken(tempRight.token);
        setRightSwapToken(tempLeft.token);

        // setLeftUserWallet(tempRight.userWallet);
        // setRightUserWallet(tempLeft.userWallet);
        //
        // setLeftUserBalance(tempRight.userBalance);
        // setRightUserBalance(tempLeft.userBalance);

        setRightSwapAmount(new Coins(0, {decimals: tempLeft.token.decimals}));
        setLeftSwapAmount(new Coins(0, {decimals: tempRight.token.decimals}));
    }

    const updateSwap = async ({ side, symbol }: {side?: ('left' | 'right'), symbol: string}) => {
        const [leftToken, rightToken] = side && side === 'right' ? [rightSwapToken, leftSwapToken] : [leftSwapToken, rightSwapToken];

        let token = tokens?.find((t) => t.symbol === symbol);
        if (token && token.address.eq(rightToken.address)) {
            switchSwap();
            return;
        }
        token = token === undefined || token.address.eq(rightToken.address) ? getTONToken() : token;
        token = token.address.eq(rightToken.address) ? getTGRToken() : token;

        setLeftSwapAmount(new Coins(0, {decimals: leftSwapToken.decimals}));
        setRightSwapAmount(new Coins(0, {decimals: rightSwapToken.decimals}));

        if (side === 'left') {
            setLeftSwapToken(token);
        } else {
            setRightSwapToken(token);
        }
    }

    const updateSwapPairs = async () => {
        const isSimpleSwap = (leftSwapToken.symbol === "TON" || rightSwapToken.symbol === "TON");
        if (isSimpleSwap) {
            setSwapPairs([await getPair(leftSwapToken.symbol, rightSwapToken.symbol, tokens)])
        } else {
            const pair1 = await getPair(leftSwapToken.symbol, "TON", tokens);
            const pair2 = await getPair("TON", rightSwapToken.symbol, tokens);
            setExtract(false);
            setSwapPairs([pair1, pair2]);
        }
        // console.log("reserves updated")
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

    const updateWallet = async (side: ('left' | 'right')) => {
        if (side === "left") {
            const leftUserWallet = leftSwapToken.symbol === "TON" ? walletInfo.address : await tonClient.Jetton.getWalletAddress(leftSwapToken.address, walletInfo.address);
            setLeftUserWallet(leftUserWallet);
        } else {
            const rightUserWallet = rightSwapToken.symbol === "TON" ? walletInfo.address : await tonClient.Jetton.getWalletAddress(rightSwapToken.address, walletInfo.address);
            setRightUserWallet(rightUserWallet);
        }
    }

    const updateBalance = async (side: ('left' | 'right')) => {
        try {
            if (side === "left") {
                const leftUserBalance = leftSwapToken.symbol === "TON" ? walletInfo.balance : leftUserWallet ? getJettonBalance(leftUserWallet) : null;
                if (!leftUserBalance) throw "unknown balance";
                setLeftUserBalance(await leftUserBalance);
            } else {
                const rightUserBalance = rightSwapToken.symbol === "TON" ? walletInfo.balance : rightUserWallet ? getJettonBalance(rightUserWallet) : null;
                if (!rightUserBalance) throw "unknown balance";
                setRightUserBalance(await rightUserBalance);
            }
        } catch {
            await updateWallet(side);
        }
    }

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
        setTokens(await getTokens());
    };
    const updatePairs = async () => {
        setPairs(await getPairs(tokens));
    };

    useEffect(() => {
        updateWallet('left');
        return () => {};
    }, [leftSwapToken, pairs]);
    useEffect(() => {
        updateBalance('left');
        return () => {};
    }, [leftUserWallet, swapPairs]);

    useEffect(() => {
        updateWallet('right');
        return () => {};
    }, [rightSwapToken, pairs]);
    useEffect(() => {
        updateBalance('right');
        return () => {};
    }, [rightUserWallet, swapPairs]);


    useEffect(() => {
        updateSwapPairs();
        return () => {};
    }, [leftSwapToken, rightSwapToken, walletInfo.balance]);


    useEffect(() => {
        updatePairs();
        return () => {};
    }, [tokens]);
    useEffect(() => {
        updateTokens();
        return () => {};
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
            setRemovePosition
        }}
        >
            {children}
        </DexContext.Provider>
    );
};
