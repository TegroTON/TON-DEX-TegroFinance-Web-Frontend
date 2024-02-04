import { useState } from "react";
import { Modal, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import Hints from "../Hints";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useTranslation } from "react-i18next";

export interface SettingsModalProps {
  slippageTolerance: number;
  setSlippageTolerance: (x: number) => void;
}

export function SettingsModal({
  slippageTolerance,
  setSlippageTolerance,
}: SettingsModalProps) {
  const { t, i18n } = useTranslation();

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const toggleSettingsModal = () => {
    setShowSettingsModal((current) => !current);
  };

  const updateSlippageTolerance = (newSlippageTolerance: number) => {
    toggleSettingsModal();
    setSlippageTolerance(newSlippageTolerance);
  };

  const debouncedUpdateSlippageTolerance = useDebounce(
    updateSlippageTolerance,
    1500
  );

  return (
    <>
      <Button variant="icon p-0 border-0" onClick={toggleSettingsModal}>
        <i className="fa-regular fa-gear fa-lg" />
      </Button>
      <Modal
        show={showSettingsModal}
        onHide={toggleSettingsModal}
        centered
        className="mobile-modal-bottom"
        contentClassName="p-2"
      >
        <Modal.Header data-bs-dismiss="modal" aria-label="Close" closeButton>
          <Modal.Title>{t("swap.settings.settings")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="fs-18 text-muted mb-4">
            {t("swap.slippageTolerance")}
            <Hints
              show="top"
              text={<>{t("swap.settings.slippageHint")}</>}
              content={
                <i className="fa-regular fa-circle-question fs-16 ms-2" />
              }
            />
          </div>
          <Row className="align-items-center mx-0">
            <Col xs={4} lg={3} className="order-2 order-lg-1 mb-2 mb-lg-0 px-1">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => updateSlippageTolerance(0.1)}
                className={`btn w-100 px-3 ${
                  slippageTolerance === 0.1 ? "btn-primary" : "btn-light"
                }`}
              >
                0,1%
              </a>
            </Col>
            <Col xs={4} lg={3} className="order-3 order-lg-2 mb-2 mb-lg-0 px-1">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => updateSlippageTolerance(0.5)}
                className={`btn w-100 px-3 ${
                  slippageTolerance === 0.5 ? "btn-primary" : "btn-light"
                }`}
              >
                0,5%
              </a>
            </Col>
            <Col xs={4} lg={3} className="order-4 order-lg-3 mb-2 mb-lg-0 px-1">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => updateSlippageTolerance(1)}
                className={`btn w-100 px-3 ${
                  slippageTolerance === 1 ? "btn-primary" : "btn-light"
                }`}
              >
                1%
              </a>
            </Col>
            <Col md={12} lg={3} className="order-1 order-lg-4 px-1">
              <InputGroup className="mb-3 mb-sm-0">
                <Form.Control
                  className="text-center fw-500"
                  min={0.1}
                  max={99.9}
                  step={0.1}
                  style={{ height: "50px" }}
                  onChange={(event) =>
                    debouncedUpdateSlippageTolerance(
                      parseFloat(event.target.value)
                    )
                  }
                  required={![0.1, 0.5, 1].includes(slippageTolerance)}
                  placeholder={`${slippageTolerance}`}
                />
                <InputGroup.Text className="ps-1 pe-3">
                  <i className="fa-solid fa-percent"></i>
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
