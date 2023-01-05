import React, { useEffect } from 'react';
import { Address, Coins } from 'ton3-core';
import {
    DeLabConnect,
    DeLabConnecting,
    DeLabEvent,
    DeLabModal,
    DeLabNetwork,
    DeLabTransaction,
    DeLabTypeConnect,
} from '@delab-team/connect';
import usePrefersColorScheme from 'use-prefers-color-scheme';
import { connector, tonClient } from './ton';
import './static/delab-fix.css';

export function DeLabButtonLabel() {
    const white = 'https://ipfs.io/ipfs/bafkreigpmboyvo43fa4ybalflby3pb3eg2emgzn7axkgd7rmvrgdpx4oja';
    // const black = 'https://ipfs.io/ipfs/bafkreibbn3nq6avodph3lcg6qlak6tbjha7levxzwgyk7nyrwot3ajvuwq';
    return (
        <>
            <img
                src={white}
                alt="DeLab Connect"
                style={{
                    width: '20px',
                    marginRight: '10px',
                }}
            />
            <span>Connect Wallet</span>
        </>
    );
}

export type DeLabContextType = {
    isConnected: boolean
    address: Address
    network: DeLabNetwork
    connectType: DeLabTypeConnect
    dataTx: any
    approveLink: string
    sendTransaction: (transaction: DeLabTransaction) => void
    balance: Coins
};

export const DeLabContext = React.createContext<DeLabContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const DeLabConnector = new DeLabConnect('https://tegro.finance/', 'Tegro Finance', 'mainnet', 'https://tegro.finance/assets/tonconnect-manifest.json');

export const DeLabContextProvider: React.FC<Props> = ({ children }) => {
    const colorScheme = usePrefersColorScheme();
    // colorScheme = colorScheme === 'no-preference' ? 'dark' : colorScheme;
    const [firstRender, setFirstRender] = React.useState<boolean>(true);

    const [isConnected, setIsConnected] = React.useState<boolean>(false);
    const [address, setAddress] = React.useState<Address>(Address.NONE);
    const [network, setNetwork] = React.useState<DeLabNetwork>('mainnet');
    const [connectType, setConnectType] = React.useState<DeLabTypeConnect>(undefined);

    const [dataTx, setDataTx] = React.useState<any>(null);
    const [approveLink, setApproveLink] = React.useState<string>('');

    const [balance, setBalance] = React.useState<Coins>(new Coins(0));

    async function sendTransaction(transaction: DeLabTransaction) {
        const dataTx2 = await DeLabConnector.sendTransaction(transaction);
        setDataTx(dataTx2);
    }

    function listenDeLab() {
        DeLabConnector.on('connect', (data: DeLabEvent) => {
            setIsConnected(true);
            const connectConfig: DeLabConnecting = data.data;
            setAddress(connectConfig.address ? new Address(connectConfig.address) : Address.NONE);
            setConnectType(connectConfig.typeConnect);
            setNetwork(connectConfig.network);
        });

        DeLabConnector.on('disconnect', () => {
            setIsConnected(false);
            setAddress(Address.NONE);
            setConnectType(undefined);
            setNetwork('mainnet');
            console.log('disconnect');
        });

        DeLabConnector.on('approve-link', (data: DeLabEvent) => {
            setApproveLink(data.data ?? '');
        });

        DeLabConnector.on('error', (data: DeLabEvent) => {
            console.log('error-> ', data.data);
        });

        DeLabConnector.on('error-transaction', (data: DeLabEvent) => {
            console.log('error-transaction-> ', data.data);
        });

        DeLabConnector.on('error-toncoinwallet', (data: DeLabEvent) => {
            console.log('error-toncoinwallet-> ', data.data);
        });

        DeLabConnector.on('error-tonhub', (data: DeLabEvent) => {
            console.log('error-tonhub-> ', data.data);
        });

        DeLabConnector.on('error-tonkeeper', (data: DeLabEvent) => {
            console.log('error-tonkeeper-> ', data.data);
        });

        DeLabConnector.loadWallet();
    }

    useEffect(() => {
        if (firstRender && DeLabConnector) {
            setFirstRender(false);
            listenDeLab();
        }
    }, []);

    const updateBalance = async () => {
        if (isConnected && address) {
            setBalance(await tonClient.getBalance(address));
        } else {
            setBalance(new Coins(0));
        }
    };

    useEffect(() => {
        updateBalance()
            .then();
    }, [isConnected]);

    useEffect(() => {
        const interval = setInterval(updateBalance, 3000);
        return () => clearInterval(interval);
    }, [address]);

    useEffect(() => {
        document.body.setAttribute('scheme', colorScheme);
    }, [colorScheme]);

    return (
        <DeLabContext.Provider value={{
            isConnected,
            address,
            network,
            connectType,
            dataTx,
            approveLink,
            sendTransaction,
            balance,
        }}
        >
            {children}
            <DeLabModal DeLabConnectObject={DeLabConnector} scheme="dark" />
        </DeLabContext.Provider>
    );
};
