import { useContext, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function ProcessingModal(props: any) {
  const { t, i18n } = useTranslation();

  return (
    <Modal
      show={props.toggleShow}
      onHide={props.toggleClose}
      centered
      className="mobile-modal-bottom"
      contentClassName="p-2"
    >
      <Modal.Body className="text-center py-5">
        <i className="fa-light fa-server fa-4x mb-4 color-blue" />
        <h2 className="card-title fs-24 fw-500 mb-3 position-relative">
          {t("processing.processing")}
          <span className="dots ms-1 mt-1">
            <span className="dot-one">.</span>
            <span className="dot-two">.</span>
            <span className="dot-three">.</span>
          </span>
        </h2>

        {/* {walletInfo?.approveLink !== "" ? (
            <QRCode
              value={walletInfo?.approveLink}
              size={256}
              quietZone={0}
              ecLevel="L"
              removeQrCodeBehindLogo
              eyeRadius={10}
              bgColor="#121418"
              fgColor="#fff"
            />
          ) : null} */}
        {/* <p className="text-muted mb-0"> */}
        {/*    {`Your ${symbol} will be credited to your account `} */}
        {/*    <br /> */}
        {/*    after this transaction has been processed. */}
        {/* </p> */}
        <p className="color-grey fs-16 mb-0">
          {t("processing.processingText")}
        </p>
      </Modal.Body>
    </Modal>
  );
}
