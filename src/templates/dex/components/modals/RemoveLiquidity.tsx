import { useContext } from "react";
import { Address, BOC, Builder, Coins } from "ton3-core";
import { tonClient } from "../../../../ton";
import { DexContext, DexContextType } from "../../../../context";
import { Modal, Button } from "react-bootstrap";

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
  return (
    <Modal
      show={props.toggle}
      onHide={props.toggle}
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
        <Button
          variant="light me-auto"
          onClick={props.toggle}
        >
          Cancel
        </Button> 
        <div onClick={props.processing}>
          <Button
            className="btn btn-red ms-auto"
            onClick={async () => {
              await handleConfirm();
            }}
          >
            <i className="fa-regular fa-trash-can me-2"></i>
            Remove Liquidity
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
