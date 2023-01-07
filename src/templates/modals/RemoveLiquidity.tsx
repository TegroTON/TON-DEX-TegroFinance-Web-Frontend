import { useContext } from 'react';
import { Address, BOC, Builder, Coins } from 'ton3-core';
import { tonClient } from '../../ton';
import { DexContext, DexContextType } from '../../context';
import { Modal, Button } from 'react-bootstrap';

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
                <div className="modal-content p-4">
                    <Modal.Body className="text-center py-5">
                        <p className="fs-24 mb-5 pb-3">Are you sure you want to delete <span className="d-inline d-md-block">the liquidation?</span></p>
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
                                <i className="fa-regular fa-trash-can me-2"></i>
                                Remove Liquidity
                            </Button>
                        </div>
                    </Modal.Body>
                </div>
            </div>
        </div>
    );
}
