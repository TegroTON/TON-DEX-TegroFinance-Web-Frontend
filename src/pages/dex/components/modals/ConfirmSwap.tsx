import React, { useState } from "react";
import { Coins } from "ton3-core";
import { Modal, Button } from "react-bootstrap";
import { ProcessingModal } from "./Processing";
import { CheckModal } from "./CheckModal";
import { useSwapQuery } from "../../../../store/api/dexApiSlice";
import { Asset } from "../../../../store/api/dexApiTypes";
import { useTranslation } from "react-i18next";
import {
  useTonAddress,
  useTonWallet,
  useTonConnectUI,
} from "@tonconnect/ui-react";

export interface ConfirmSwapProps {
  fromAsset: Asset;
  toAsset: Asset;
  fromAmount: number;
  toAmount: number;
  minReceived: Coins;
  slippageTolerance: number;
}

export function ConfirmSwapModal({
  fromAsset,
  toAsset,
  fromAmount,
  toAmount,
  minReceived,
  slippageTolerance,
}: ConfirmSwapProps) {
  const { t, i18n } = useTranslation();

  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const [showConfirmSwap, setShowConfirmSwap] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);

  const { data: transactionData } = useSwapQuery(
    {
      userWalletAddress: address?.toString() || "",
      offerJettonAddress: fromAsset.contract_address,
      offerAmount: new Coins(fromAmount.toFixed(fromAsset.decimals), {
        decimals: fromAsset.decimals,
      }).toNano(),
      askJettonAddress: toAsset.contract_address,
      minAskAmount: minReceived.toNano(),
    },
    {
      skip: !wallet || !address || !showConfirmSwap,
      refetchOnMountOrArgChange: true,
    }
  );

  // console.log(transactionData);

  const handleConfirm = async () => {
    if (!wallet || !transactionData) {
      return;
    }

    try {
      const response = await tonConnectUI?.sendTransaction({
        validUntil: transactionData.valid_until,
        messages: transactionData.messages.map((message) => ({
          address: message.to,
          amount: message.amount,
          payload: message.payload,
        })),
      });
      // console.log(response);
    } catch (e) {
      // console.log(e);
      // TODO: Transaction is canceled. Show Transaction canceled Modal.
    }
  };

  const toggleConfirmModal = () => {
    setShowConfirmSwap((current) => !current);
  };

  const ProcessingModalClose = () => setShowProcessingModal(false);

  const CheckModalClose = () => setShowCheckModal(false);

  return (
    <>
      <Button variant="primary fs-16 w-100" onClick={toggleConfirmModal}>
        {t("swap.confirm.exchange")}
      </Button>
      <Modal
        show={showConfirmSwap}
        onHide={toggleConfirmModal}
        centered
        className="modal-dialog-centered mobile-modal-bottom"
        contentClassName="p-2"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("swap.confirm.youGet")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-4">
            <img
              className="token-form__img rounded-circle"
              onError={(e) =>
                (e.currentTarget.src =
                  "/static/assets/images/token/default-token-image.png")
              }
              src={toAsset.image_url}
              width="48"
              height="48"
              alt={toAsset.display_name}
            />
            <div className="ms-4">
              <h4 className="fs-20 fw-700 mb-0">{`${toAmount} ${toAsset.symbol}`}</h4>
              <p className="mb-0 fw-500 color-grey">{`${fromAsset.symbol} / ${toAsset.symbol}`}</p>
            </div>
          </div>
          <p className="mb-3 color-grey">
            {t("swap.confirm.transactionCompleteCondition.part1")}
            <span className="fw-700 color-blue">{`${slippageTolerance}%`}</span>
            {t("swap.confirm.transactionCompleteCondition.part2")}
          </p>
          <ul className="list-unstyled card-alert p-3 mb-0 bg-light rounded-8">
            <li className="list-item d-flex mb-0">
              <span className="me-auto fw-500">
                {t("swap.minimumReceived")}
              </span>
              <span className="color-grey">
                {`${(minReceived ?? "0").toString()} ${toAsset.symbol}`}
              </span>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-2">
          <Button
            className="btn btn-light me-auto"
            onClick={toggleConfirmModal}
          >
            {t("swap.confirm.cancel")}
          </Button>
          <Button
            className="btn btn-red"
            onClick={async () => {
              setShowConfirmSwap(false);
              setShowProcessingModal(true);
              await handleConfirm();
              setShowProcessingModal(false);
              setShowCheckModal(true);
            }}
          >
            <i className="fa-regular fa-circle-plus me-2" />
            {t("swap.confirm.confirm")}
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
