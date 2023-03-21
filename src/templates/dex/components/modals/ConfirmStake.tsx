import { useContext, useState } from "react";
import { Address, BOC, Coins } from "ton3-core";
import { useNavigate } from "react-router-dom";
import { DexContext, DexContextType } from "../../../../context";
import { DexBetaPairContract } from "../../../../ton/dex/contracts/DexBetaPairContract";
import { tonClient } from "../../../../ton";
import { Token } from "../../../../ton/dex/api/types";
import { TON_ADDRESS } from "../../../../ton/dex/constants";
import { Modal, Button } from "react-bootstrap";
import { addrToStr } from "../../../../ton/dex/utils";
import { ProcessingModal } from "./Processing";
import { CheckModal } from "./CheckModal";

export function ConfirmStakeModal(props: any) {
  const navigate = useNavigate();
  const { walletInfo, poolPair, poolParams, tokens } = useContext(
    DexContext
  ) as DexContextType;
  const { inAmount, outAmount } = poolParams;
  const tonBalance = walletInfo ? walletInfo.balance : new Coins(0);

  const from = tokens?.find(
    (t) => addrToStr(t.address) === addrToStr(poolPair.leftToken.address)
  ) as Token;

  const to = tokens?.find(
    (t) => addrToStr(t.address) === addrToStr(poolPair.rightToken.address)
  ) as Token;

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

    const payload = dexPair.createAddLiquidityRequest(
      new Coins(0.4).add(tonAmount),
      jettonAmount,
      walletInfo!.address
    );
    // const payload = poolPair.rightToken.eq(TON_ADDRESS)
    //     ? dexPair.createAddLiquidityRequest(outAmount, inAmount, walletInfo!.address)
    //     : dexPair.createAddLiquidityRequest(inAmount, outAmount, walletInfo!.address);

    await walletInfo?.sendTransaction({
      to: jettonWallet!.toString("base64", { bounceable: true }),
      value: new Coins(0.5).add(tonAmount).toNano(),
      payload: BOC.toBase64Standard(payload),
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
      const balance = await tonClient.getBalance(
        new Address(walletInfo!.address!)
      );
      if (!tonBalance.eq(balance)) {
        window.location.replace("/liquidity");
      }
    }, 1000);
    // window.location.reload()
    // throw Error('Payment Channel not open')
  };

  const [showConfirmStake, setShowConfirmStake] = useState(false);
  const toggleConfirmStakeModal = () => {
    setShowConfirmStake((current) => !current);
  };

  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const ProcessingModalClose = () => setShowProcessingModal(false);
  const ProcessingModalShow = () => setShowProcessingModal(true);

  const [showCheckModal, setShowCheckModal] = useState(false);
  const CheckModalClose = () => setShowCheckModal(false);
  const CheckModalShow = () => setShowCheckModal(true);

  return (
    <>
      <Button variant="primary fs-16 w-100" onClick={toggleConfirmStakeModal}>
        Add Liquidity
      </Button>
      <Modal
        show={showConfirmStake}
        onHide={toggleConfirmStakeModal}
        centered
        className="mobile-modal-bottom"
      >
        <Modal.Body className="text-center py-5">
          <i className="fa-light fa-coins fa-4x mb-4 color-blue" />
          <p className="fs-20 mb-0">Do you want to stake? 🙂</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-light me-auto" onClick={toggleConfirmStakeModal}>
            Cancel
          </Button>
            <Button
              variant="red"
              onClick={async () => {
                setShowConfirmStake(false);
                setShowProcessingModal(true);
                await handleConfirm();
                await setShowProcessingModal(false);
                await setShowCheckModal(true);
              }}
            >
              Confirm
            </Button>
        </Modal.Footer>
      </Modal>

      <ProcessingModal
        toggleShow={showProcessingModal}
        toggleClose={ProcessingModalClose}
      />
      <CheckModal toggleShow={showCheckModal} toggleClose={CheckModalClose} />
    </>
  );
}
