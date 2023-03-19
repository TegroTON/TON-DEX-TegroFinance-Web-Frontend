import { useContext, useState } from "react";
import { Address, BOC, Builder, Coins } from "ton3-core";
import { tonClient } from "../../../../ton";
import { DexContext, DexContextType } from "../../../../context";
import { Modal, Button } from "react-bootstrap";
import { ProcessingModal } from "./Processing";
import { CheckModal } from "./CheckModal";

export function RemoveLiquidityModal(props: any) {
  const { walletInfo, removePosition, poolPositions } = useContext(
    DexContext
  ) as DexContextType;
  const poolPosition = !removePosition
    ? poolPositions.length > 0
      ? poolPositions[0]
      : null
    : removePosition;
  if (!poolPosition) return <></>;

  const tonBalance = walletInfo ? walletInfo.balance : new Coins(0);
  const handleConfirm = async () => {
    const pairAddress = poolPosition.pair;
    const wallet = await tonClient.Jetton.getWalletAddress(
      pairAddress,
      walletInfo!.address
    );
    const payload = new Builder()
      .storeUint(0x595f07bc, 32)
      .storeUint(515, 64)
      .storeCoins(poolPosition.lpBalance)
      .storeAddress(walletInfo!.address)
      .storeBit(0)
      .cell();

    await walletInfo?.sendTransaction({
      to: wallet.toString("base64", { bounceable: true }),
      value: new Coins(1.5).toNano(),
      payload: BOC.toBase64Standard(payload),
    });

    const interval = setInterval(async () => {
      const balance = await tonClient.getBalance(
        new Address(walletInfo!.address!)
      );
      if (!tonBalance.eq(balance)) {
        window.location.reload();
      }
    }, 1000);
  };

  const [showRemoveLiquidityModal, setShowRemoveLiquidityModal] =
    useState(false);
  const toggleRemoveLiquidityModal = () => {
    setShowRemoveLiquidityModal((current) => !current);
  };

  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const ProcessingModalClose = () => setShowProcessingModal(false);
  const ProcessingModalShow = () => setShowProcessingModal(true);

  const [showCheckModal, setShowCheckModal] = useState(false);
  const CheckModalClose = () => setShowCheckModal(false);
  const CheckModalShow = () => setShowCheckModal(true);

  
  return (
    <>
      <Button variant="light btn-sm" onClick={toggleRemoveLiquidityModal}>
        <i className="fa-regular fa-trash-can me-2" /> Remove Liquidity
      </Button>
      <Modal
        show={showRemoveLiquidityModal}
        onHide={toggleRemoveLiquidityModal}
        centered
        className="mobile-modal-bottom"
      >
        <Modal.Body className="text-center py-5">
          <i className="fa-light fa-trash-list fa-4x mb-4 color-blue" />
          <p className="fs-20 mb-0">
            Are you sure you want <br /> to remove liquidity? 🤔
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light me-auto" onClick={toggleRemoveLiquidityModal}>
            Cancel
          </Button>
            <Button
              className="btn btn-red ms-auto"
              onClick={async () => {
                setShowRemoveLiquidityModal(false);
                setShowProcessingModal(true);
                await handleConfirm();
                await setShowProcessingModal(false);
                await setShowCheckModal(true);
              }}
            >
              <i className="fa-regular fa-trash-can me-2"></i>
              Remove Liquidity
            </Button>
        </Modal.Footer>
      </Modal>
      {/* Processing Modal  */}
      <ProcessingModal
        toggleShow={showProcessingModal}
        toggleClose={ProcessingModalClose}
      />
      <CheckModal toggleShow={showCheckModal} toggleClose={CheckModalClose} />
    </>
  );
}
