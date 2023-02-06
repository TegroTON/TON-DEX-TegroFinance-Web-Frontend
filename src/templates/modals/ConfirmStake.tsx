import { useContext } from 'react';
import { Address, BOC, Coins } from 'ton3-core';
import { useNavigate } from 'react-router-dom';
import { DexContext, DexContextType } from '../../context';
import { DexBetaPairContract } from '../../ton/dex/contracts/DexBetaPairContract';
import { tonClient } from '../../ton';
import { Token } from '../../ton/dex/api/types';
import { TON_ADDRESS } from '../../ton/dex/constants';
import { Modal, Button } from 'react-bootstrap';
import {addrToStr} from "../../ton/dex/utils";

export function ConfirmStakeModal() {
    const navigate = useNavigate();
    const {
        walletInfo,
        poolPair,
        poolParams,
        tokens,
    } = useContext(DexContext) as DexContextType;
    const {
        inAmount,
        outAmount
    } = poolParams;
    const tonBalance = walletInfo ? walletInfo.balance : new Coins(0);

    const from = tokens?.find((t) => addrToStr(t.address) === addrToStr(poolPair.leftToken.address)) as Token;

    const to = tokens?.find((t) => addrToStr(t.address) === addrToStr(poolPair.rightToken.address)) as Token;

    const handleConfirm = async () => {
        // const adapter = walletService.getWalletAdapter(walletInfo?.adapterId as string);
        const dexPair = new DexBetaPairContract(new Address(poolPair.address));
        // console.log(left, address.toString());
        let tonAmount = inAmount;
        let jettonAmount = outAmount;
        let jettonWallet = poolPair.rightWallet;
        if (!poolPair.rightToken.address) {
            [jettonAmount, tonAmount] = [tonAmount, jettonAmount];
            jettonWallet = poolPair.leftWallet;
        }

        const payload = dexPair.createAddLiquidityRequest(new Coins(0.4).add(tonAmount), jettonAmount, walletInfo!.address);
        // const payload = poolPair.rightToken.eq(TON_ADDRESS)
        //     ? dexPair.createAddLiquidityRequest(outAmount, inAmount, walletInfo!.address)
        //     : dexPair.createAddLiquidityRequest(inAmount, outAmount, walletInfo!.address);

        await walletInfo?.sendTransaction({
            to: jettonWallet!.toString("base64", {bounceable: true}),
            value: new Coins(0.5).add(tonAmount)
                .toNano(),
            payload: BOC.toBase64Standard(payload)
            // .replaceAll('+', '-')
            // .replaceAll('/', '_'),
        });

        // const sleep = (m: any) => new Promise(r => setTimeout(r, m))
        //
        // for (let x = 0; x < 100; x++) {
        //     const balance = await tonClient.getBalance(new Address(walletInfo?.meta.address as string))
        //     if (! tonBalance.eq(balance)) {
        //         await sleep(10000)
        //         await updateDexInfo()
        //         window.location.reload()
        //     }
        //     await sleep(1000)
        // }
        const interval = setInterval(async () => {
            const balance = await tonClient.getBalance(new Address(walletInfo!.address!));
            if (!tonBalance.eq(balance)) {
                window.location.replace('/liquidity');
            }
        }, 1000);
        // window.location.reload()
        // throw Error('Payment Channel not open')
    };

    return (
        <div className="modal fade" id="ConfirmStake" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered mobile-modal-bottom">
                <div className="modal-content p-4">
                    <Modal.Body className="text-center py-5">
                        <p className="fs-24 mb-5 pb-3">Do you want to stake?</p>
                        <div className="d-flex flex-column flex-md-row justify-content-center">
                            <Button className="btn btn-light me-0 me-md-3" data-bs-dismiss="modal" aria-label="Close">Cancel</Button>
                            <Button className="btn btn-red mt-3 mt-md-0"
                                data-bs-dismiss="modal"
                                data-bs-toggle="modal"
                                data-bs-target="#ProcessingModal"
                                onClick={async () => {
                                    await handleConfirm();
                                }}
                            >
                                <i className="fa-regular fa-circle-plus me-2" />
                                Confirm offer
                            </Button>
                        </div>
                    </Modal.Body>
                </div>
            </div>
        </div>
    );
}
