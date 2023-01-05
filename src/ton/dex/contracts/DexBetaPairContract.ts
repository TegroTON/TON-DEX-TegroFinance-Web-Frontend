import {
    Address, Builder, Cell, Coins,
} from 'ton3-core';
import { TonClient } from '@tegro/ton3-client';
import { JettonWallet } from '@tegro/ton3-contracts';
import { tonClient } from '../../index';
import { DexOP } from './constants';

export class DexBetaPairContract {
    constructor(
        public readonly address: Address,
    ) {
        this.address = address;
    }

    static createTonSwapRequest(maxIn: Coins, minReceived: Coins, destination: Address): Cell {
        const queryId = Math.round(Date.now() / Math.PI / Math.random());
        return new Builder()
            .storeUint(DexOP.swapTon, 32)
            .storeUint(queryId, 64)
            .storeBit(0) // extract
            .storeCoins(maxIn) // max_in
            .storeCoins(minReceived) // min_out
            .storeAddress(destination) // destination
            .storeAddress(destination) // error_destination
            .storeBit(0) // custom payload (Maybe ^Cell)
            .cell();
    }

    createAddLiquidityRequest(tonAmount: Coins, jettonAmount: Coins, myAddress: Address): Cell {
        const queryId = Math.round(Date.now() / Math.PI / Math.random());
        const payload = new Builder()
            .storeUint(DexOP.addLiquidity, 32) // sub-op
            .storeCoins(new Coins(0))
            .storeCoins(new Coins(0))
            .cell();
        return JettonWallet.createTransferRequest({
            queryId,
            amount: jettonAmount,
            destination: this.address,
            responseDestination: myAddress,
            forwardAmount: tonAmount,
            forwardPayload: payload,
        });
    }

    // async createInstallRequest(client: TonClient, jettonAddress: string): Promise<Cell> {
    //     const jettonWalletAddress = tonClient.Jetton.getWalletAddress(
    //         new Address(jettonAddress),
    //         new Address(this.address),
    //     );
    //     const queryId = Math.round(Date.now() / Math.PI / Math.random());
    //     return new Builder()
    //         .storeUint(0x3356dc14, 32)
    //         .storeUint(queryId, 64)
    //         .storeAddress(await jettonWalletAddress)
    //         .cell();
    // }

    // createRemoveLiquidityRequest(lpAmount: Coins): Cell {
    //     // тут надо сделать запрос на сжигание этих токенов
    // }

    async getReserves(client: TonClient): Promise<[Coins, Coins]> {
        const { stack } = await client.callGetMethod(this.address, 'get::reserves', []);
        return stack.map((item: bigint) => new Coins(item, { isNano: true })) as [Coins, Coins];
    }

    createJettonSwapRequest(jettonAmount: Coins, minReceived: Coins, myAddress: Address): Cell {
        const queryId = Math.round(Date.now() / Math.PI / Math.random());
        const payload = new Builder()
            .storeUint(DexOP.swapJetton, 32) // sub-op
            .storeBit(0) // extract
            .storeCoins(new Coins(4999999999)) // max_in
            .storeCoins(minReceived) // min_out
            .storeAddress(myAddress) // destination
            .storeAddress(myAddress) // error_destination
            .storeBit(0) // custom payload
            .cell();
        return JettonWallet.createTransferRequest({
            queryId,
            amount: jettonAmount,
            destination: this.address,
            responseDestination: myAddress,
            forwardAmount: new Coins(0.15),
            forwardPayload: payload,
        });
    }

    async getLPShare(client: TonClient, LPAmount: Coins): Promise<[Coins, Coins]> {
        const { stack } = await client.callGetMethod(this.address, 'get_lp_share', [['num', LPAmount.toNano()]]);
        return stack.map((item: bigint) => new Coins(item, { isNano: true })) as [Coins, Coins];
    }
}
