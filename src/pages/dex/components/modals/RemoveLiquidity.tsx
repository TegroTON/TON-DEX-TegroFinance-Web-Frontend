import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ProcessingModal } from "./Processing";
import { CheckModal } from "./CheckModal";
import { Pool } from "../../../../store/api/dexApiTypes";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useRemoveLiquidityQuery } from "../../../../store/api/dexApiSlice";
import { useTranslation } from "react-i18next";

export interface RemoveLiquidityProps {
  pool: Pool;
}

export function RemoveLiquidityModal({ pool }: RemoveLiquidityProps) {
  const { t } = useTranslation();

  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const [showRemoveLiquidityModal, setShowRemoveLiquidityModal] =
    useState(false);

  const { data: transactionData } = useRemoveLiquidityQuery(
    {
      user_wallet_address: address,
      token0_address: pool.token0_address,
      token1_address: pool.token1_address,
      lp_tokens_amount: pool.lp_balance?.toString() ?? "0",
    },
    {
      skip: !pool.lp_balance || address === "" || !showRemoveLiquidityModal,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleConfirm = async () => {
    if (!transactionData) {
      return;
    }

    try {
      await tonConnectUI?.sendTransaction({
        validUntil: transactionData.valid_until,
        messages: transactionData.messages.map((message) => ({
          address: message.to,
          amount: message.amount,
          payload: message.payload,
        })),
      });
    } catch (error) {
      // console.log(error);
    }
  };

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
      <Button
        variant="btn-sm btn-outline-red"
        size="sm"
        // className="me-auto"
        onClick={toggleRemoveLiquidityModal}
      >
        <i className="fa-regular fa-trash-can me-2" />
        {t("liquidity.remove.remove")}
      </Button>
      <Modal
        show={showRemoveLiquidityModal}
        onHide={toggleRemoveLiquidityModal}
        centered
        className="mobile-modal-bottom"
        contentClassName="p-2"
      >
        <Modal.Body className="text-center py-5">
          <i className="fa-light fa-trash-list fa-4x mb-4 color-blue" />
          <p className="fs-20 mb-0">
            {t("liquidity.remove.confirmationMessage")} 🤔
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light me-auto" onClick={toggleRemoveLiquidityModal}>
            {t("common.cancel")}
          </Button>
          {transactionData ? (
            <Button
              className="btn btn-red ms-auto"
              onClick={async () => {
                setShowRemoveLiquidityModal(false);
                setShowProcessingModal(true);
                await handleConfirm();
                setShowProcessingModal(false);
                setShowCheckModal(true);
              }}
            >
              <i className="fa-regular fa-trash-can me-2"></i>
              {t("liquidity.remove.removeLiquidity")}
            </Button>
          ) : (
            <div className="btn btn-red btn-primary text-center rounded-8 disabled">
              {t("common.preparingTransaction")}
            </div>
          )}
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
