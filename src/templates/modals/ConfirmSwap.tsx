import { useContext } from 'react';
import { Address, BOC, Coins } from 'ton3-core';
import { DexContext, DexContextType } from '../../context';
import { DexBetaPairContract } from '../../ton/dex/contracts/DexBetaPairContract';
import { tonClient } from '../../ton';
import { Token } from '../../ton/dex/api/types';
import { TON_ADDRESS } from '../../ton/dex/constants';

export function ConfirmSwapModal() {
    const {
        walletInfo,
        swapPair,
        swapParams,
        tokens,
        updatePair,
    } = useContext(DexContext) as DexContextType;
    const {
        slippage,
        inAmount,
        outAmount,
    } = swapParams;
    const tonBalance = walletInfo ? walletInfo.balance : new Coins(0);
    const minReceived = new Coins(outAmount).mul(1 - slippage / 100);

    const from = tokens?.find((t) => t.address.eq(swapPair.leftToken)) as Token;

    const to = tokens?.find((t) => t.address.eq(swapPair.rightToken)) as Token;

    const handleConfirm = async () => {
        // const adapter = walletService.getWalletAdapter(walletInfo?.adapterId as string);
        const dexPair = new DexBetaPairContract(new Address(swapPair.address));
        // console.log(left, address.toString());
        if (swapPair.rightToken.eq(TON_ADDRESS)) {
            const payload = dexPair.createJettonSwapRequest(inAmount, minReceived, walletInfo?.address as Address);
            await walletInfo?.sendTransaction({
                to: swapPair.leftWallet!.toString(),
                value: new Coins(0.5).toNano(),
                payload: BOC.toBase64Standard(payload),
                // .replaceAll('+', '-')
                // .replaceAll('/', '_'),
            });
        } else {
            console.log(minReceived.toString());
            const payload = DexBetaPairContract.createTonSwapRequest(inAmount, minReceived, walletInfo?.address as Address);
            await walletInfo?.sendTransaction({
                to: dexPair.address.toString(),
                value: new Coins(inAmount).add(new Coins(0.5))
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
                await updatePair({});
                window.location.reload();
            }
        }, 1000);
        // window.location.reload()
        // throw Error('Payment Channel not open')
    };

    return (
        <div className="modal fade" id="ConfirmSwap" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered mobile-modal-bottom">
                <div className="modal-content border-0 rounded p-40">
                    <div className="modal-header border-0 p-0 mb-40">
                        <h5 className="modal-title" id="ConnectModalLabel">You get</h5>
                        <button
                            type="button"
                            className="btn p-0"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <i className="fa-solid fa-xmark fa-lg" />
                        </button>
                    </div>
                    <div className="modal-body p-0">
                        <div className="d-flex align-items-center mb-4">
                            <img src={to.image} width="40" height="40" alt={to.name} />
                            <div className="ms-4">
                                <h4 className="fs-24 fw-700 mb-0">{`${outAmount} ${to.symbol}`}</h4>
                                <p className="mb-0 text-muted">{`${from.name} / ${to.name}`}</p>
                            </div>
                        </div>
                        <p className="mb-40 text-muted">
                            {`The result is an orienteer. If the price changes by more than ${slippage}%, `}
                            <span
                                className="d-inline d-md-block"
                            >
                                the transaction will be returned.
                            </span>
                        </p>
                        <div className="card-alert p-4 bg-soft-blue rounded-8 mb-40">
                            <ul className="list-unstyled">
                                <li className="list-item d-flex mb-4">
                                    <span className="me-auto fw-500">Min Received:</span>
                                    <span
                                        className="text-muted"
                                    >
                                        {`${minReceived.toString()} ${to.symbol}`}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <button
                                type="button"
                                className="btn btn-sm color-red me-3"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                data-bs-dismiss="modal"
                                data-bs-toggle="modal"
                                data-bs-target="#ProcessingModal"
                                onClick={async () => {
                                    await handleConfirm();
                                }}
                            >
                                <i className="fa-regular fa-circle-plus me-2" />
                                Confirm offer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
