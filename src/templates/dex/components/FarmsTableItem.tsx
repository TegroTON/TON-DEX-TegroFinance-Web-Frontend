import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Collapse, Form, InputGroup, Dropdown, Nav, Stack, ListGroup, Accordion, ProgressBar, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";

function FarmsTableItem(props: any) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="flex-tr flex-row fw-500">
                <div className="flex-td flex-td__name d-flex align-items-center">
                    <Badge bg={props.statusColor} className="order-2 order-md-1 rounded-8 fs-11 fw-700 me-0 me-md-3 ms-3 ms-md-0" style={{ width: '52px', padding: "8px" }}>
                        {props.statusName}
                    </Badge>
                    <div className="order-1 order-md-2 d-flex align-items-center">
                        <div className="d-flex align-items-center me-3">
                            <img className="rounded-circle bg-light border" style={{ width: '32px', height: '32px', zIndex: '1' }} src={props.TokenImageFirst} alt={props.TokenNameFirst} />
                            <img className="rounded-circle bg-light border" style={{ width: '32px', height: '32px', marginLeft: '-10px' }} src={props.TokenImageSecond} alt={props.TokenNameSecond} />
                        </div>
                        <div className="flex-td__TokenName text-nowrap">{props.TokenNameFirst} - {props.TokenNameSecond}</div>
                    </div>
                </div>
                <div className="flex-td flex-td__APR d-none d-lg-block">
                    <div className="color-grey fs-12">
                        <span className="me-1">APR</span>
                        <i className="fa-regular fa-circle-question" />
                    </div>
                    <span className="fw-500 me-1">{props.APR}</span>
                    <i className="fa-regular fa-calculator-simple color-grey" />
                </div>
                <div className="flex-td flex-td__APY d-none d-lg-block">
                    <div className="color-grey fs-12">APY</div>
                    <span className="fw-500 me-1">{props.APY}</span>
                    <i className="fa-regular fa-circle-question color-grey" />
                </div>
                <div className="flex-td flex-td__Liquidity d-none d-lg-block">
                    <div className="color-grey fs-12">Liquidity</div>
                    <span className="fw-500 me-1">{props.Liquidity}</span>
                    <i className="fa-regular fa-circle-question color-grey" />
                </div>
                <div className="flex-td flex-td__Erned d-none d-lg-block">
                    <div className="color-grey fs-12">Erned</div>
                    <span className="fw-500 me-1">{props.Erned}</span>
                </div>
                <div className="flex-td d-flex align-items-cetner justify-content-end color-grey">
                    <Button
                        variant="none p-0 border-0 color-blue me-4 fs-14"
                        onClick={() => setOpen(!open)}
                        aria-controls="flex-table__collapse"
                        aria-expanded={open}
                    >
                        <span className="d-none d-md-inline">Details</span>
                        <i className="fa-solid fa-angle-down ms-0 ms-md-2" />
                    </Button>
                    <i className="fa-regular fa-circle-info fs-16" />
                </div>
            </div>
            <Collapse in={open}>
                <div id="flex-table__collapse">
                    <Row className="d-flex d-lg-none border-bottom bg-light border-bottom p-3 p-lg-4">
                        <Col className="col-6 col-sm-6 col-md-3 mb-3 mb-3 mb-md-0">
                            <div className="flex-td flex-td__APR p-0">
                                <div className="color-grey fs-12">
                                    <span className="me-1">APR</span>
                                    <i className="fa-regular fa-circle-question" />
                                </div>
                                <span className="fw-500 me-1">{props.APR}</span>
                                <i className="fa-regular fa-calculator-simple color-grey" />
                            </div>
                        </Col>
                        <Col className="col-6 col-sm-6 col-md-3 mb-3 mb-md-0 text-end text-md-start">
                            <div className="flex-td flex-td__APY p-0">
                                <div className="color-grey fs-12">APY</div>
                                <span className="fw-500 me-1">{props.APY}</span>
                                <i className="fa-regular fa-circle-question color-grey" />
                            </div>
                        </Col>
                        <Col className="col-6 col-sm-6 col-md-3">
                            <div className="flex-td flex-td__Liquidity p-0">
                                <div className="color-grey fs-12">Liquidity</div>
                                <span className="fw-500 me-1">{props.Liquidity}</span>
                                <i className="fa-regular fa-circle-question color-grey" />
                            </div>
                        </Col>
                        <Col className="col-6 col-sm-6 col-md-3 text-end">
                            <div className="flex-td flex-td__Erned p-0">
                                <div className="color-grey fs-12">Erned</div>
                                <span className="fw-500 me-1">{props.Erned}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="bg-light border-bottom p-3 p-lg-4">
                        <Col md={12} lg={4} className="d-flex align-items-center mb-4 mb-lg-0">
                            <Button variant="light btn-sm order-2 order-lg-1">Get LP</Button>
                            <div className="me-auto me-lg-0 ms-0 ms-lg-4  order-1 order-lg-2">
                                <div className="fs-12 color-grey">Available LP</div>
                                <div>
                                    <span className="me-2 fw-500">{props.AvailableLP}</span>
                                    <span className="color-grey fs-12">~ {props.AvailableLPUSD}</span>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} lg={4} className="d-flex align-items-center mb-4 mb-lg-0">
                            <Button variant="primary btn-sm order-2 order-lg-1 text-nowrap">Enable Farm</Button>
                            <div className="me-auto me-lg-0 ms-0 ms-lg-4 order-1 order-lg-2">
                                <div className="fs-12 color-grey">Staked LP</div>
                                <div>
                                    <span className="me-2 fw-500">{props.StakedLP}</span>
                                    <span className="color-grey fs-12">~ {props.StakedLPUSD}</span>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} lg={4} className="d-flex align-items-center">
                            <Button variant="green btn-sm order-2 order-lg-1 disabled">Horvest</Button>
                            <div className="me-auto me-lg-0 ms-0 ms-lg-4 order-1 order-lg-2">
                                <div className="fs-12 color-grey">Earn</div>
                                <div>
                                    <span className="me-2 fw-500">{props.EarnLP}</span>
                                    <span className="color-grey fs-12">~ {props.EarnLPUSD}</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Collapse>

        </>
    );
}

export default FarmsTableItem;