import {useContext} from 'react';
import {Address, BOC, Coins} from 'ton3-core';
import {useNavigate} from 'react-router-dom';
import {DexContext, DexContextType} from '../../context';
import {DexBetaPairContract} from '../../ton/dex/contracts/DexBetaPairContract';
import {tonClient} from '../../ton';
import {Token} from '../../ton/dex/api/types';
import {TON_ADDRESS} from '../../ton/dex/constants';

export function ConfirmStakeModal() {
    const navigate = useNavigate();
    const {
        walletInfo,
        poolPair,
        poolParams,
        tokens,
        updatePair,
    } = useContext(DexContext) as DexContextType;
    const {
        inAmount,
        outAmount
    } = poolParams;
    const tonBalance = walletInfo ? walletInfo.balance : new Coins(0);

    const from = tokens?.find((t) => t.address.eq(poolPair.leftToken)) as Token;

    const to = tokens?.find((t) => t.address.eq(poolPair.rightToken)) as Token;

    const handleConfirm = async () => {
        // const adapter = walletService.getWalletAdapter(walletInfo?.adapterId as string);
        const dexPair = new DexBetaPairContract(new Address(poolPair.address));
        // console.log(left, address.toString());
        let tonAmount = inAmount;
        let jettonAmount = outAmount;
        let jettonWallet = poolPair.rightWallet;
        if (poolPair.rightToken.eq(TON_ADDRESS)) {
            [jettonAmount, tonAmount] = [tonAmount, jettonAmount];
            jettonWallet = poolPair.leftWallet;
        }

        const payload = dexPair.createAddLiquidityRequest(new Coins(0.15).add(tonAmount), jettonAmount, walletInfo!.address);
        // const payload = poolPair.rightToken.eq(TON_ADDRESS)
        //     ? dexPair.createAddLiquidityRequest(outAmount, inAmount, walletInfo!.address)
        //     : dexPair.createAddLiquidityRequest(inAmount, outAmount, walletInfo!.address);

        await walletInfo?.sendTransaction({
            to: jettonWallet!.toString(),
            value: new Coins(0.25).add(tonAmount)
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
                await updatePair({});
                window.location.replace('/liquidity');
            }
        }, 1000);
        // window.location.reload()
        // throw Error('Payment Channel not open')
    };

    return (
        <div className="modal fade" id="ConfirmStake" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered mobile-modal-bottom">
                <div className="modal-content border-0 rounded p-40">
                    <div className="modal-header border-0 p-0 mb-40">
                        <h5 className="modal-title" id="ConnectModalLabel">Do you want to stake?</h5>
                        <button
                            type="button"
                            className="btn p-0"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <i className="fa-solid fa-xmark fa-lg"/>
                        </button>
                    </div>
                    <div className="modal-body p-0">
                        {/* <div className="d-flex align-items-center mb-4"> */}
                        {/*     <img src={to.image} width="40" height="40" alt={to.name} /> */}
                        {/*     <div className="ms-4"> */}
                        {/*         <h4 className="fs-24 fw-700 mb-0">{`${outAmount} ${to.symbol}`}</h4> */}
                        {/*         <p className="mb-0 text-muted">{`${from.name} / ${to.name}`}</p> */}
                        {/*     </div> */}
                        {/* </div> */}
                        {/* <p className="mb-40 text-muted"> */}
                        {/*     {`The result is an orienteer. If the price changes by more than ${slippage}%, `} */}
                        {/*     <span className="d-inline d-md-block">the transaction will be returned.</span> */}
                        {/* </p> */}
                        {/* <div className="card-alert p-4 bg-soft-blue rounded-8 mb-40"> */}
                        {/*     <ul className="list-unstyled"> */}
                        {/*         <li className="list-item d-flex mb-4"> */}
                        {/*             <span className="me-auto fw-500">Min Received:</span> */}
                        {/*             <span className="text-muted">{`${minReceived.toString()} ${to.symbol}`}</span> */}
                        {/*         </li> */}
                        {/*     </ul> */}
                        {/* </div> */}
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
                                <i className="fa-regular fa-circle-plus me-2"/>
                                Confirm offer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
