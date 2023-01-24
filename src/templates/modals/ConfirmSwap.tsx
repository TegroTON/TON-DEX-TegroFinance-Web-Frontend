import React, { useContext } from 'react';
import { Address, BOC, Coins } from 'ton3-core';
import { DexContext, DexContextType } from '../../context';
import { DexBetaPairContract } from '../../ton/dex/contracts/DexBetaPairContract';
import { tonClient } from '../../ton';
import { Token } from '../../ton/dex/api/types';
import { TON_ADDRESS } from '../../ton/dex/constants';
import { Modal, Button } from 'react-bootstrap';
import {CoinsToDecimals, getOutAmount} from "../../ton/dex/utils";

export function ConfirmSwapModal() {
    const {
        walletInfo,
        swapLeft,
        swapRight,
        swapPairs,
        slippage,
        tokens,
        extract,
        swapWallets,
        referral
    } = useContext(DexContext) as DexContextType;
    const { amount: inAmount, token: from } = swapLeft;
    const { amount: outAmount, token: to } = swapRight;

    const tonBalance = walletInfo ? walletInfo.balance : new Coins(0);
    let minReceived = new Coins(0, {decimals: swapRight.token.decimals});
    let maxSold = new Coins(0, {decimals: swapLeft.token.decimals});
    try {
        minReceived = new Coins(swapRight.amount, {decimals: swapRight.token.decimals}).mul(1 - slippage / 100);
        maxSold = new Coins(swapLeft.amount, {decimals: swapLeft.token.decimals}).mul(1 + slippage / 100);
    } catch {
        // pass
    }
    const isRoute = swapPairs.length === 2;

    const handleConfirm = async () => {
        // const adapter = walletService.getWalletAdapter(walletInfo?.adapterId as string);
        const dexPair = new DexBetaPairContract(new Address(swapPairs[0].address));
        // console.log(left, address.toString());
        if (!swapPairs[0].rightToken.address) {
            if (isRoute) {
                const minReceived0 = getOutAmount(inAmount, swapPairs[0].leftReserved, swapPairs[0].rightReserved);
                const minReceived0D = CoinsToDecimals(minReceived0, swapPairs[0].rightToken.decimals);
                const payload = dexPair.createRouteSwapRequest(inAmount, minReceived0D, minReceived, walletInfo?.address as Address, swapPairs[1].address, referral);
                await walletInfo?.sendTransaction({
                    to: swapWallets.left.wallet!.toString("base64", {bounceable: true}),
                    value: new Coins(0.6).toNano(),
                    payload: BOC.toBase64Standard(payload),
                    // .replaceAll('+', '-')
                    // .replaceAll('/', '_'),
                });
            } else {
                const payload = dexPair.createJettonSwapRequest(
                    extract,
                    extract ? maxSold : inAmount,
                    extract ? outAmount : minReceived,
                    walletInfo?.address as Address, referral);
                await walletInfo?.sendTransaction({
                    to: swapWallets.left.wallet!.toString("base64", {bounceable: true}),
                    value: new Coins(0.3).toNano(),
                    payload: BOC.toBase64Standard(payload),
                    // .replaceAll('+', '-')
                    // .replaceAll('/', '_'),
                });
            }

        } else {
            const payload = DexBetaPairContract.createTonSwapRequest(
                    extract,
                    extract ? maxSold : inAmount,
                    extract ? outAmount : minReceived,
                    walletInfo?.address as Address, referral);
            await walletInfo?.sendTransaction({
                to: dexPair.address.toString(),
                value: new Coins(extract ? maxSold : inAmount).add(new Coins(0.3))
                    .toNano(),
                payload: BOC.toBase64Standard(payload),
                // .replaceAll('+', '-')
                // .replaceAll('/', '_'),
            });
        }
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
                window.location.reload();
            }
        }, 1000);
        // window.location.reload()
        // throw Error('Payment Channel not open')
    };

    return (
        <div className="modal fade" id="ConfirmSwap" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered mobile-modal-bottom">
                <div className="modal-content p-4">
                    <Modal.Header className="border-0 mb-40 p-0">
                        <Modal.Title>You get</Modal.Title>
                        <button type="button" className="btn border-0 p-0" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark fa-lg"></i></button>
                    </Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="d-flex align-items-center mb-4">
                            <img src={to.image} width="48" height="48" alt={to.name} />
                            <div className="ms-4">
                                <h4 className="fs-24 fw-700 mb-0">{`${outAmount} ${to.symbol}`}</h4>
                                <p className="mb-0 fw-500 text-muted">{`${from.name} / ${to.name}`}</p>
                            </div>
                        </div>
                        <p className="mb-40 text-muted">
                        The result is an orienteer. If the price changes by more than <span className="fw-700 color-blue">{`${slippage}%`}</span>,
                            <span
                                className="d-inline d-md-block"
                            >
                                the transaction will be returned.
                            </span>
                        </p>
                        <ul className="list-unstyled card-alert p-3 bg-light rounded-8 mb-4">
                            <li className="list-item d-flex mb-0">
                                {extract ? (<>
                                        <span className="me-auto fw-500">Maximum sold:</span>
                                        <span className="text-muted">
                                            {`${(maxSold ?? '0').toString()} ${swapLeft.token.symbol}`}
                                        </span>
                                    </>) : (<>
                                        <span className="me-auto fw-500">Minimum received:</span>
                                        <span className="text-muted">
                                            {`${(minReceived ?? '0').toString()} ${swapRight.token.symbol}`}
                                        </span>
                                </>)}
                            </li>
                        </ul>
                        <div className="d-flex">
                            <Button className="btn btn-light me-auto" data-bs-dismiss="modal" aria-label="Close">
                                Cancel
                            </Button>
                            <Button className="btn btn-red" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#ProcessingModal"
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
