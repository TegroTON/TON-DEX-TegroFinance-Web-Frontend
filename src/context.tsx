import React, { useContext, useEffect, useState } from 'react';
import { Coins } from 'ton3-core';
import {
    PairData, PoolPosition, PoolPositions, SwapParams,
} from './types';
import {
    getDefaultPair,
    getDefaultPairs,
    getDefaultSwapParams,
    getDefaultTokens,
    getJettonBalance,
} from './ton/utils';
import { tonClient } from './ton';
import { getOutAmount, getPairByTokens } from './ton/dex/utils';
import { getPairs, getTokens } from './ton/dex/api/apiClient';
import { DeLabContext, DeLabContextType } from './deLabContext';
import { Pair, Pairs, Tokens } from './ton/dex/api/types';
import { TON_ADDRESS } from './ton/dex/constants';

export type DexContextType = {
    pairs: Pairs;
    tokens: Tokens;
    swapPair: PairData;
    swapParams: SwapParams;
    updateSwapParams: (newSwapParams: SwapParams) => void;
    poolPair: PairData;
    poolParams: SwapParams;
    updatePoolParams: (newPoolParams: SwapParams) => void;

    poolPositions: PoolPositions;
    walletInfo: DeLabContextType | null;
    updatePair: ({
        when,
        newPair,
    }: {
        when?: ('pool' | 'swap'),
        newPair?: Pair
    }) => void

    updateSlippage: (newSlippage: number) => void;
    updatePoolPositions: () => void;
};

export const DexContext = React.createContext<DexContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const DexContextProvider: React.FC<Props> = ({ children }) => {
    const [swapParams, setSwapParams] = React.useState<SwapParams>(getDefaultSwapParams());
    const [poolParams, setPoolParams] = React.useState<SwapParams>(getDefaultSwapParams());

    const [pairs, setPairs] = React.useState<Pairs>(getDefaultPairs());
    const [tokens, setTokens] = React.useState<Tokens>(getDefaultTokens());

    const [swapPair, setSwapPair] = React.useState<PairData>(getDefaultPair());
    const [poolPair, setPoolPair] = React.useState<PairData>(getDefaultPair());

    const [poolPositions, setPoolPositions] = React.useState<PoolPositions>([]);

    const walletInfo = useContext(DeLabContext) as DeLabContextType;

    const updatePair = async ({
        when,
        newPair,
    }: {
        when?: ('pool' | 'swap'),
        newPair?: Pair
    }) => {
        let newXXXPair = !when || when === 'swap' ? swapPair : poolPair;

        if (newPair) {
            newXXXPair = {
                ...newXXXPair,
                leftToken: newPair.leftToken,
                rightToken: newPair.rightToken,
                address: newPair.address,
            };
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
            leftWallet = leftToken.eq(TON_ADDRESS) ? null : await tonClient.Jetton.getWalletAddress(leftToken, walletInfo.address);
            rightWallet = rightToken.eq(TON_ADDRESS) ? null : await tonClient.Jetton.getWalletAddress(rightToken, walletInfo.address);
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
        } = getPairByTokens(pairs, leftToken, rightToken);

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
        if (!when || (when === 'swap')) {
            setSwapPair(newXXXPair);
        } else {
            setPoolPair(newXXXPair);
        }
    };

    const updateSlippage = (newSlippage: number) => {
        let correctSlippage = newSlippage;
        if (correctSlippage > 99.6) correctSlippage = 99.6;
        if (correctSlippage < 0.1) correctSlippage = 0.1;
        const newSwapParams = {
            ...swapParams,
            slippage: correctSlippage,
        };
        setSwapParams(newSwapParams);
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

    useEffect(() => {
        updatePair({ when: 'swap' })
            .then();
        updatePair({ when: 'pool' })
            .then();
        updatePoolPositions()
            .then();
    }, [walletInfo.address, walletInfo.isConnected, pairs, swapPair.leftToken]);

    const [lastBalance, setLastBalance] = useState<Coins>(new Coins(0));
    useEffect(() => {
        if (!(lastBalance.eq(walletInfo.balance))) {
            setLastBalance(walletInfo.balance);
            updatePair({ when: 'swap' })
                .then();
            updatePair({ when: 'pool' })
                .then();
            updatePoolPositions()
                .then();
        }
    }, [walletInfo.balance]);

    const updateTokens = async () => {
        setTokens(await getTokens());
    };
    const updatePairs = async () => {
        setPairs(await getPairs(tokens));
    };

    useEffect(() => {
        // updatePairs();
    }, [pairs]);
    useEffect(() => {
        updatePairs();
    }, [tokens]);
    useEffect(() => {
        // updateDexInfo().then();
        updateTokens();
    }, []);

    return (
        <DexContext.Provider value={{
            pairs,
            tokens,
            swapPair,
            swapParams,
            poolPair,
            poolPositions,
            walletInfo,
            updateSlippage,
            updateSwapParams,
            updatePair,
            updatePoolPositions,
            poolParams,
            updatePoolParams,
        }}
        >
            {children}
        </DexContext.Provider>
    );
};
