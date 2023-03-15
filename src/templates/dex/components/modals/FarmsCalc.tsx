import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FarmsCalcModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link p-0" onClick={handleShow}>
        <i className="fa-regular fa-calculator-simple color-grey" />
      </Button>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>ROI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4 color-grey">
            Calculated based on current rates. Rates are estimates <br />
            provided for your convenience only, and by no means <br />
            represent guaranteed returns.
          </div>
          <div className="flex-table">
            <Row className="color-grey mb-2 mx-0 fw-500">
              <Col>Timeframe</Col>
              <Col>ROI</Col>
              <Col>TGR per $1 000</Col>
            </Row>
            <Row className="align-items-center p-2 bg-light rounded-8 mx-0">
              <Col className="fw-500">1d</Col>
              <Col className="fw-500">0.08%</Col>
              <Col>
                <div className="fw-500">4.23 TGR</div>
                <div className="fw-500 fs-12 color-grey">$0.79</div>
              </Col>
            </Row>
            <Row className="align-items-center p-2 rounded-8 mx-0">
              <Col className="fw-500">7d</Col>
              <Col className="fw-500">0.56%</Col>
              <Col>
                <div className="fw-500">29.59 TGR</div>
                <div className="fw-500 fs-12 color-grey">$5.56</div>
              </Col>
            </Row>
            <Row className="align-items-center p-2 bg-light rounded-8 mx-0">
              <Col className="fw-500">30d</Col>
              <Col className="fw-500">2.38%</Col>
              <Col>
                <div className="fw-500">126.83 TGR</div>
                <div className="fw-500 fs-12 color-grey">$23.85</div>
              </Col>
            </Row>
            <Row className="align-items-center p-2 rounded-8 mx-0">
              <Col className="fw-500">365d</Col>
              <Col className="fw-500">29.01%</Col>
              <Col>
                <div className="fw-500">1543.09 TGR</div>
                <div className="fw-500 fs-12 color-grey">$290.12</div>
              </Col>
            </Row>
            <Row className="align-items-center p-2 bg-light rounded-8 mx-0">
              <Col className="fw-500">365d (APY)</Col>
              <Col className="fw-500">41.03%</Col>
              <Col>
                <div className="fw-500">2182.29 TGR</div>
                <div className="fw-500 fs-12 color-grey">$410.30</div>
              </Col>
            </Row>
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}
export default FarmsCalcModal;
