import React, { useContext, useEffect, useState } from 'react';
import {Address, Coins} from 'ton3-core';
import {
    PairData, PoolPosition, PoolPositions, SwapParams, TokenData,
} from './types';
import {
    getDefaultPair,
    getDefaultPairs,
    getDefaultSwapParams,
    getDefaultTokens,
    getJettonBalance, getTGRToken, getTGRTokenData, getTONToken, getTONTokenData,
} from './ton/utils';
import { tonClient } from './ton';
import { getOutAmount, getPairByTokens } from './ton/dex/utils';
import {getPair, getPairs, getTokens} from './ton/dex/api/apiClient';
import { DeLabContext, DeLabContextType } from './deLabContext';
import {Pair, Pairs, Token, Tokens} from './ton/dex/api/types';
import { TON_ADDRESS } from './ton/dex/constants';

export type DexContextType = {
    pairs: Pairs;
    tokens: Tokens;
    swapLeft: TokenData;
    swapRight: TokenData;
    swapPairs: Pair[];
    swapParams: SwapParams;
    updateSwapParams: (newSwapParams: SwapParams) => void;
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
    const [swapParams, setSwapParams] = React.useState<SwapParams>(getDefaultSwapParams());
    const [poolParams, setPoolParams] = React.useState<SwapParams>(getDefaultSwapParams());

    const [slippage, setSlippage] = React.useState(5.0);

    const [pairs, setPairs] = React.useState<Pairs>(getDefaultPairs());
    const [tokens, setTokens] = React.useState<Tokens>(getDefaultTokens());

    // SWAP PARAMS
    const [leftSwapToken, setLeftSwapToken] = React.useState(getTONToken());
    const [leftUserWallet, setLeftUserWallet] = React.useState(Address.NONE);
    const [leftUserBalance, setLeftUserBalance] = React.useState(new Coins(0));

    const [rightSwapToken, setRightSwapToken] = React.useState(getTGRToken());
    const [rightUserWallet, setRightUserWallet] = React.useState(Address.NONE);
    const [rightUserBalance, setRightUserBalance] = React.useState(new Coins(0));

    // Route if swapPairs.length === 2
    const [swapPairs, setSwapPairs] = React.useState<Pairs>([getDefaultPairs()[0]]);

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
            setSwapParams({
                ...swapParams,
                outAmount: getOutAmount(
                    swapParams.inAmount,
                    newPair.leftReserved,
                    newPair.rightReserved,
                ),
            });
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

        console.log('left', leftReserved.toString(), 'right', rightReserved.toString());

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
        const tempLeft = leftSwapToken;
        const tempRight = rightSwapToken;
        setLeftSwapToken(tempRight);
        setRightSwapToken(tempLeft);
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

        if (side === 'left') {
            setLeftSwapToken(token);
        } else {
            setRightSwapToken(token);
        }
    }

    const updateSwapPairs = async () => {
        const isSimpleSwap = (leftSwapToken.symbol === "TON" || rightSwapToken.symbol === "TON");
        if (isSimpleSwap) {
            if (leftSwapToken.symbol !== swapPairs[0].leftToken.symbol &&
                rightSwapToken.symbol !== swapPairs[0].rightToken.symbol) {
                setSwapParams({...swapParams, inAmount: new Coins(0), outAmount: new Coins(0)});
            }
            setSwapPairs([await getPair(leftSwapToken.symbol, rightSwapToken.symbol, tokens)])
        } else {
            if (swapPairs.length === 1 || (leftSwapToken.symbol !== swapPairs[0].leftToken.symbol &&
                rightSwapToken.symbol !== swapPairs[1].rightToken.symbol)) {
                setSwapParams({...swapParams, inAmount: new Coins(0), outAmount: new Coins(0)});
            }
            const pair1 = await getPair(leftSwapToken.symbol, "TON", tokens);
            const pair2 = await getPair("TON", rightSwapToken.symbol, tokens);
            setSwapPairs([pair1, pair2]);
        }
        // console.log("reserves updated")
    }

    const updateSlippage = (newSlippage: number) => {
        setSlippage(newSlippage < 0.1 ? 0.1 : newSlippage > 99.6 ? 99.6 : newSlippage);
    };

    const updateSwapParams = (newSwapParams: SwapParams) => {
        setSwapParams(newSwapParams);
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

    const updateBalances = async () => {
        const leftUserWallet = leftSwapToken.symbol === "TON" ? walletInfo.address : await tonClient.Jetton.getWalletAddress(leftSwapToken.address, walletInfo.address);
        const leftUserBalance = leftSwapToken.symbol === "TON" ? walletInfo.balance : getJettonBalance(leftUserWallet);

        const rightUserWallet = rightSwapToken.symbol === "TON" ? walletInfo.address : await tonClient.Jetton.getWalletAddress(rightSwapToken.address, walletInfo.address);
        const rightUserBalance = rightSwapToken.symbol === "TON" ? walletInfo.balance : getJettonBalance(rightUserWallet);


        setLeftUserWallet(leftUserWallet)
        setLeftUserBalance(await leftUserBalance)

        setRightUserWallet(rightUserWallet)
        setRightUserBalance(await rightUserBalance)
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
        updateSwapPairs();
        return () => {};
    }, [leftSwapToken, rightSwapToken]);

    useEffect(() => {
        updateBalances();
        // const interval = setInterval(updateBalances, 3000);
        // return () => clearInterval(interval);
        return () => {};
    }, [swapPairs]);

    useEffect(() => {
        updateSwapPairs();
        return () => {};
    }, [walletInfo.balance])


    useEffect(() => {
        updatePairs();
        return () => {};
    }, [tokens]);
    useEffect(() => {
        // updateDexInfo().then();
        updateTokens();
        return () => {};
    }, []);

    const swapLeft = {token: leftSwapToken, userWallet: leftUserWallet, userBalance: leftUserBalance}
    const swapRight = {token: rightSwapToken, userWallet: rightUserWallet, userBalance: rightUserBalance}

    const [removePosition, setRemovePosition] = React.useState<PoolPosition | null>(null);

    return (
        <DexContext.Provider value={{
            pairs,
            tokens,
            swapLeft,
            swapRight,
            swapParams,
            swapPairs,
            poolPair,
            poolPositions,
            walletInfo,
            updateSlippage,
            updateSwapParams,
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
