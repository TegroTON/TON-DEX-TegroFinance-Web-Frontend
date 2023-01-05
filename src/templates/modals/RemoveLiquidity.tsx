import { useContext } from 'react';
import {Address, BOC, Builder, Coins} from 'ton3-core';
import { tonClient } from '../../ton';
import { DexContext, DexContextType } from '../../context';

export function RemoveLiquidityModal() {
    const {
        walletInfo,
        poolPositions,
    } = useContext(DexContext) as DexContextType;
    const tonBalance = walletInfo ? walletInfo.balance : new Coins(0);
    const handleConfirm = async () => {
        const pairAddress = poolPositions[0].pair;
        const wallet = await tonClient.Jetton.getWalletAddress(pairAddress, walletInfo!.address);
        const payload = new Builder()
            .storeUint(0x595f07bc, 32)
            .storeUint(515, 64)
            .storeCoins(poolPositions[0].lpBalance)
            .storeAddress(pairAddress)
            .storeBit(0)
            .cell();

        await walletInfo?.sendTransaction({
            to: wallet.toString(),
            value: new Coins(1.5).toNano(),
            payload: BOC.toBase64Standard(payload),
        });


        const interval = setInterval(async () => {
            const balance = await tonClient.getBalance(new Address(walletInfo!.address!));
            if (!tonBalance.eq(balance)) {
                window.location.reload();
            }
        }, 1000);
    };
    return (
        <div className="modal fade" id="RemoveLiquidity" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered mobile-modal-bottom">
                <div className="modal-content border-0 rounded p-40">
                    <div className="modal-body text-center p-0">
                        <p className="fs-24 mb-40 pb-3">
                            Are you sure you want to remove
                            <span className="d-inline d-md-block">
                                liquidity?
                            </span>
                        </p>
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
                            <i className="fa-regular fa-trash-can me-2" />
                            Remove Liquidity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
