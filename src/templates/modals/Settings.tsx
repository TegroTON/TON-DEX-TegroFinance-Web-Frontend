import { useContext } from 'react';
import { DexContext, DexContextType } from '../../context';
import { Modal, Row, Col, Form, InputGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export function SettingsModal() {
    const {
        swapParams,
        updateSlippage,
    } = useContext(DexContext) as DexContextType;
    const { slippage } = swapParams;

    return (
        <div className="modal fade" id="SettingsModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered mobile-modal-bottom">
                <div className="modal-content p-4">
                    <Modal.Header className="border-0 mb-40 p-0">
                        <Modal.Title>Settings</Modal.Title>
                        <button type="button" className="btn border-0 p-0" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark fa-lg"></i></button>
                    </Modal.Header>
                    <Modal.Body className="p-0">
                        <div className="fw-500 fs-18 text-muted mb-4">
                            Slippage tolerance
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip className="fs-12 ms-4" id={`tooltip-$right`}>
                                        Your transaction will revert it the price changes unfavorably by more than this percentage.
                                    </Tooltip>
                                }
                            >
                                <a href="#!" className="text-muted ms-2">
                                    <i className="fa-regular fa-circle-question color-blue"></i>
                                </a>
                            </OverlayTrigger>
                        </div>
                        <Row>
                            <Col lg={3} className="mb-2 mb-lg-0">
                                <a
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => updateSlippage(0.1)}
                                    className={`btn d-block ${slippage === 0.1 ? 'btn-primary' : 'btn-light'}`}
                                >
                                    0,1%
                                </a>
                            </Col>
                            <Col lg={3} className="mb-2 mb-lg-0">
                                <a
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => updateSlippage(0.5)}
                                    className={`btn d-block ${slippage === 0.5 ? 'btn-primary' : 'btn-light'}`}
                                >
                                    0,5%
                                </a>
                            </Col>
                            <Col lg={3} className="mb-2 mb-lg-0">
                                <a
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => updateSlippage(1)}
                                    className={`btn d-block ${slippage === 1 ? 'btn-primary' : 'btn-light'}`}
                                >
                                    1%
                                </a>
                            </Col>
                            <Col lg={3} className="mb-2 mb-lg-0">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="number"
                                        className="form-control"
                                        defaultValue={slippage}
                                        min={0.1}
                                        max={99.9}
                                        step={0.1}
                                        style={{ height: '50px' }}
                                        onChange={(event) => updateSlippage(parseFloat(event.target.value))}
                                        required={![0.1, 0.5, 1].includes(slippage)}
                                        placeholder="3%"
                                    />
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fa-solid fa-percent"></i>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                </div>
            </div >
        </div >
    );
}
