import React, { useState, useRef } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    ButtonGroup,
    Form,
    InputGroup,
    Dropdown,
    Nav,
    Stack,
    ListGroup,
    Accordion,
    ProgressBar,
    OverlayTrigger,
    Tooltip,
    Badge
} from "react-bootstrap";

export function StakingPage() {

    return (
        <>
            <section className="section hero border-bottom" style={{ paddingTop: '96px', paddingBottom: '238px' }}>
                <Container>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        {/* <div className="mb-4 d-flex align-items-center justify-conten-center">
                            <div className="shadow rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', zIndex: '2' }}>
                                <img className="rounded-circle" style={{ width: '80px', height: '80px' }} src="./assets/images/token/ton.png" alt="" />
                            </div>
                            <div className="shadow rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', marginLeft: '-24px' }}>
                                <img className="rounded-circle" style={{ width: '80px', height: '80px' }} src="./assets/images/token/TGR.png" alt="" />
                            </div>
                        </div> */}
                        <h1 className="fw-800 mb-3" style={{ fontSize: '50px' }}>Fixed Staking</h1>
                        <p className="fs-20 color-grey mb-0" data-bs-toggle="tooltip" data-bs-title="Default tooltip">
                            1st on TONCOIN DEX. Level up your crypto earn!
                        </p>
                    </div>
                    <div className="lines">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </Container>
            </section>
            <section className="section position-relative pb-5" style={{ marginTop: '-152px', zIndex: '1' }}>
                <Container>
                    <Row className="mb-4">
                        <Col lg={6} className="d-flex align-items-center mb-4 mb-lg-0">
                            <Nav justify variant="pills" className="content-nav-pills d-flex align-items-center" style={{ height: '44px' }}>
                                <Nav.Item>
                                    <a href="#!" className="nav-link btn active py-2">Active</a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="#!" className="nav-link btn py-2">Inactive</a>
                                </Nav.Item>
                            </Nav>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label={
                                    <div className="ms-1 color-grey">Staked only</div>
                                }
                                className="ms-auto ms-lg-3 mb-0"
                            />
                        </Col>
                        <Col lg={6} className="d-flex align-items-center">
                            <Dropdown className="ms-lg-auto">
                                <Dropdown.Toggle variant="primary btn-sm" style={{ height: '44px' }}>All</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" className="active">
                                        All
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">APY</Dropdown.Item>
                                    <Dropdown.Item href="#">Total staked</Dropdown.Item>
                                    <Dropdown.Item href="#">Earned</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form className="ms-3">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <i className="fa-regular fa-magnifying-glass" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search Coins"
                                        aria-label="Search Coins"
                                        style={{ minHeight: "40px" }}
                                    />
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        {/* Card Col */}
                        <Col md={6} xl={4}>
                            <Card className="p-0 mb-4">
                                {/* Card Badge */}
                                <div className="position-absolute end-0 top-0 px-3 py-2 rounded m-2 bg-soft-blue fw-500">
                                    <i className="fa-regular fa-clock-eight me-2" />
                                    30 days
                                </div>
                                {/* Card Header */}
                                <Card.Header className="p-4 border-bottom">
                                    <div className="d-flex aligh-items-center mb-4">
                                        <img
                                            className="rounded"
                                            src="./assets/images/token/TGR.png"
                                            width={50}
                                            height={50}
                                        />
                                        <div className="ms-4">
                                            <Card.Title className="card-title fs-20 fw-700 mb-0">
                                                Earn TGR
                                            </Card.Title>
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-Apy"
                                                        style={{
                                                            position: 'absolute'
                                                        }}
                                                    >
                                                        APY is calculated when Harvest and Stake is made once in
                                                        30 days within a year
                                                    </Tooltip>
                                                }
                                            >
                                                <div className="color-grey fs-16 fw-500">Stake <u>APY</u> <span className="fw-700">2.73%</span></div>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    {/* Progress Bar  */}
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center fw-500 mx-1 mb-2">
                                            <div className="d-flex align-items-center">
                                                Total Stake
                                                <OverlayTrigger
                                                    key="right"
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-commission">
                                                            The total stake of tokens for all users in this pool
                                                        </Tooltip>
                                                    }
                                                >
                                                    <i className="fa-regular fa-circle-question color-grey ms-2" />
                                                </OverlayTrigger>
                                            </div>
                                            <div className="ms-auto">
                                                547.88 <span className="color-grey">/ 1 000</span>
                                            </div>
                                        </div>
                                        <ProgressBar
                                            variant="green"
                                            className="bg-light"
                                            now={52}
                                            style={{ height: "8px" }}
                                        />
                                    </div>
                                </Card.Header>
                                {/* Card Body */}
                                <Card.Body className="p-4">
                                    {/* List Box One */}
                                    <ListGroup className="list-unstyled mb-3 mx-1">
                                        <ListGroup.Item className="d-flex">
                                            <span className="me-auto color-grey">
                                                Total stake per user:
                                            </span>
                                            <span className="fw-500">250 TGR</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* List Box Two */}
                                    <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                                        <ListGroup.Item className="d-flex align-items-center mb-3">
                                            <div className="d-flex align-items-center me-auto color-grey">
                                                Earned TGR
                                                <Badge bg="soft-red" className="ms-2 p-2">Not active</Badge>
                                            </div>
                                            <Button variant="green btn-sm py-2 px-3 disabled">Harvest</Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex align-items-center">
                                            <span className="me-auto color-grey">Overview</span>
                                            <a href="#!" className="link" target="_blank">
                                                View contract{" "}
                                                <i className="fa-regular fa-arrow-up-right-from-square ms-2" />
                                            </a>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* Button */}
                                    <Button variant="primary d-flex align-items-center justify-content-center btn-sm w-100">
                                        <img
                                            className="rounded me-3"
                                            src="./assets/images/token/TGR.png"
                                            width={24}
                                            height={24}
                                            style={{ outline: '2px solid var(--bg-primary)' }}
                                        />
                                        <span className="fs-16 fw-500">Approve TGR</span>
                                    </Button>
                                    {/* Commission Box */}
                                    <div className="mt-3">
                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    1.99% commission fee is required for early withdrawal.
                                                    No additional fees after 30 days lock term.
                                                </Tooltip>
                                            }
                                        >
                                            <div className="color-grey text-center">
                                                1.99% unstaking fee if withdrawn within 30d
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Card Col */}
                        <Col md={6} xl={4}>
                            <Card className="p-0 mb-4">
                                {/* Card Badge */}
                                <div className="position-absolute end-0 top-0 px-3 py-2 rounded m-2 bg-soft-blue fw-500">
                                    <i className="fa-regular fa-clock-eight me-2" />
                                    30 days
                                </div>
                                {/* Card Header */}
                                <Card.Header className="p-4 border-bottom">
                                    <div className="d-flex align-items-center mb-4">
                                        <img
                                            className="rounded"
                                            src="./assets/images/token/ggr.png"
                                            width={50}
                                            height={50}
                                        />
                                        <div className="ms-4">
                                            <Card.Title className="card-title fs-20 fw-700 mb-0">
                                                Earn GGR
                                            </Card.Title>
                                            <OverlayTrigger
                                                key="left"
                                                overlay={
                                                    <Tooltip id="tooltip-Apy">
                                                        APY is calculated when Harvest and Stake is made once in
                                                        30 days within a year
                                                    </Tooltip>
                                                }
                                            >
                                                <div className="color-grey fs-16 fw-500">Stake <u>APY</u> <span className="fw-700">4.20%</span></div>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    {/* Progress Bar  */}
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center fw-500 mx-1 mb-2">
                                            <div className="d-flex align-items-center">
                                                Total Stake
                                                <OverlayTrigger
                                                    key="right"
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-commission">
                                                            The total stake of tokens for all users in this pool
                                                        </Tooltip>
                                                    }
                                                >
                                                    <i className="fa-regular fa-circle-question color-grey ms-2" />
                                                </OverlayTrigger>
                                            </div>
                                            <div className="ms-auto">
                                                240 <span className="color-grey">/ 6000</span>
                                            </div>
                                        </div>
                                        <ProgressBar
                                            variant="green"
                                            className="bg-light"
                                            now={30}
                                            style={{ height: "8px" }}
                                        />
                                    </div>
                                </Card.Header>
                                {/* Card Body */}
                                <Card.Body className="p-4">
                                    {/* List Box One */}
                                    <ListGroup className="list-unstyled mb-3 mx-1">
                                        <ListGroup.Item className="d-flex">
                                            <span className="me-auto color-grey">
                                                Total stake per user:
                                            </span>
                                            <span className="fw-500">30 GGR</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* List Box Two */}
                                    <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                                        <ListGroup.Item className="d-flex align-items-center mb-3">
                                            <div className="d-flex align-items-center me-auto color-grey">
                                                Earned GGR
                                            </div>
                                            <Button variant="green btn-sm py-2 px-3">Harvest</Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex align-items-center">
                                            <span className="me-auto color-grey">Overview</span>
                                            <a href="#!" className="link" target="_blank">
                                                View contract{" "}
                                                <i className="fa-regular fa-arrow-up-right-from-square ms-2" />
                                            </a>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* Button */}
                                    <Button variant="primary d-flex align-items-center justify-content-center btn-sm w-100">
                                        <img
                                            className="rounded me-3"
                                            src="./assets/images/token/ggr.png"
                                            width={24}
                                            height={24}
                                            style={{ outline: '2px solid var(--bg-primary)' }}
                                        />
                                        <span className="fs-16 fw-500">Approve GGR</span>
                                    </Button>
                                    {/* Commission Box */}
                                    <div className="mt-3">
                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    1.99% commission fee is required for early withdrawal.
                                                    No additional fees after 30 days lock term.
                                                </Tooltip>
                                            }
                                        >
                                            <div className="color-grey text-center">
                                                1.99% unstaking fee if withdrawn within 30d
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Card Col */}
                        <Col md={6} xl={4}>
                            <Card className="p-0 mb-4">
                                {/* Card Badge */}
                                <div className="position-absolute end-0 top-0 px-3 py-2 rounded m-2 bg-soft-green fw-500">
                                    <i className="fa-regular fa-clock-eight me-2" />
                                    60 days
                                </div>
                                {/* Card Header */}
                                <Card.Header className="p-4 border-bottom">
                                    <div className="d-flex align-items-center mb-4">
                                        <img
                                            className="rounded"
                                            src="./assets/images/token/lave.png"
                                            width={50}
                                            height={50}
                                        />
                                        <div className="ms-4">
                                            <Card.Title className="card-title fs-20 fw-700 mb-0">
                                                Earn LAVE
                                            </Card.Title>
                                            <OverlayTrigger
                                                key="left"
                                                overlay={
                                                    <Tooltip id="tooltip-Apy">
                                                        APY is calculated when Harvest and Stake is made once in
                                                        60 days within a year
                                                    </Tooltip>
                                                }
                                            >
                                                <div className="color-grey fs-16 fw-500">Stake <u>APY</u> <span className="fw-700">2.73%</span></div>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    {/* Progress Bar  */}
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center fw-500 mx-1 mb-2">
                                            <div className="d-flex align-items-center">
                                                Total Stake
                                                <OverlayTrigger
                                                    key="right"
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-commission">
                                                            The total stake of tokens for all users in this pool
                                                        </Tooltip>
                                                    }
                                                >
                                                    <i className="fa-regular fa-circle-question color-grey ms-2" />
                                                </OverlayTrigger>
                                            </div>
                                            <div className="ms-auto">
                                                4768 <span className="color-grey">/ 6000</span>
                                            </div>
                                        </div>
                                        <ProgressBar
                                            variant="green"
                                            className="bg-light"
                                            now={73}
                                            style={{ height: "8px" }}
                                        />
                                    </div>
                                </Card.Header>
                                {/* Card Body */}
                                <Card.Body className="p-4">
                                    {/* List Box One */}
                                    <ListGroup className="list-unstyled mb-3 mx-1">
                                        <ListGroup.Item className="d-flex">
                                            <span className="me-auto color-grey">
                                                Total stake per user:
                                            </span>
                                            <span className="fw-500">400 LAVE</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* List Box Two */}
                                    <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                                        <ListGroup.Item className="d-flex align-items-center mb-3">
                                            <div className="d-flex align-items-center me-auto color-grey">
                                                Earned LAVE
                                                <Badge bg="soft-red" className="ms-2 p-2">Not active</Badge>
                                            </div>
                                            <Button variant="green btn-sm py-2 px-3 disabled">Harvest</Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex align-items-center">
                                            <span className="me-auto color-grey">Overview</span>
                                            <a href="#!" className="link" target="_blank">
                                                View contract{" "}
                                                <i className="fa-regular fa-arrow-up-right-from-square ms-2" />
                                            </a>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* Button */}
                                    <Button variant="primary d-flex align-items-center justify-content-center btn-sm w-100">
                                        <img
                                            className="rounded me-3"
                                            src="./assets/images/token/lave.png"
                                            width={24}
                                            height={24}
                                            style={{ outline: '2px solid var(--bg-primary)' }}
                                        />
                                        <span className="fs-16 fw-500">Approve LAVE</span>
                                    </Button>
                                    {/* Commission Box */}
                                    <div className="mt-3">
                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    1.99% commission fee is required for early withdrawal.
                                                    No additional fees after 30 days lock term.
                                                </Tooltip>
                                            }
                                        >
                                            <div className="color-grey text-center">
                                                1.99% unstaking fee if withdrawn within 30d
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Card Col */}
                        <Col md={6} xl={4}>
                            <Card className="p-0 mb-4">
                                {/* Card Badge */}
                                <div className="position-absolute end-0 top-0 px-3 py-2 rounded m-2 bg-soft-green fw-500">
                                    <i className="fa-regular fa-clock-eight me-2" />
                                    60 days
                                </div>
                                {/* Card Header */}
                                <Card.Header className="p-4 border-bottom">
                                    <div className="d-flex align-items-center mb-4">
                                        <img
                                            className="rounded"
                                            src="./assets/images/token/idu.png"
                                            width={50}
                                            height={50}
                                        />
                                        <div className="ms-4">
                                            <Card.Title className="card-title fs-20 fw-700 mb-0">
                                                Earn IDU
                                            </Card.Title>
                                            <OverlayTrigger
                                                key="left"
                                                overlay={
                                                    <Tooltip id="tooltip-Apy">
                                                        APY is calculated when Harvest and Stake is made once in
                                                        60 days within a year
                                                    </Tooltip>
                                                }
                                            >
                                                <div className="color-grey fs-16 fw-500">Stake <u>APY</u> <span className="fw-700">8.23%</span></div>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    {/* Progress Bar  */}
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center fw-500 mx-1 mb-2">
                                            <div className="d-flex align-items-center">
                                                Total Stake
                                                <OverlayTrigger
                                                    key="right"
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-commission">
                                                            The total stake of tokens for all users in this pool
                                                        </Tooltip>
                                                    }
                                                >
                                                    <i className="fa-regular fa-circle-question color-grey ms-2" />
                                                </OverlayTrigger>
                                            </div>
                                            <div className="ms-auto">
                                                360.20 <span className="color-grey">/ 2 000</span>
                                            </div>
                                        </div>
                                        <ProgressBar
                                            variant="green"
                                            className="bg-light"
                                            now={22}
                                            style={{ height: "8px" }}
                                        />
                                    </div>
                                </Card.Header>
                                {/* Card Body */}
                                <Card.Body className="p-4">
                                    {/* List Box One */}
                                    <ListGroup className="list-unstyled mb-3 mx-1">
                                        <ListGroup.Item className="d-flex">
                                            <span className="me-auto color-grey">
                                                Total stake per user:
                                            </span>
                                            <span className="fw-500">20 IDU</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* List Box Two */}
                                    <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                                        <ListGroup.Item className="d-flex align-items-center mb-3">
                                            <div className="d-flex align-items-center me-auto color-grey">
                                                Earned IDU
                                                <Badge bg="soft-red" className="ms-2 p-2">Not active</Badge>
                                            </div>
                                            <Button variant="green btn-sm py-2 px-3 disabled">Harvest</Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex align-items-center">
                                            <span className="me-auto color-grey">Overview</span>
                                            <a href="#!" className="link" target="_blank">
                                                View contract{" "}
                                                <i className="fa-regular fa-arrow-up-right-from-square ms-2" />
                                            </a>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* Button */}
                                    <Button variant="primary d-flex align-items-center justify-content-center btn-sm w-100">
                                        <img
                                            className="rounded me-3"
                                            src="./assets/images/token/IDU.png"
                                            width={24}
                                            height={24}
                                            style={{ outline: '2px solid var(--bg-primary)' }}
                                        />
                                        <span className="fs-16 fw-500">Approve IDU</span>
                                    </Button>
                                    {/* Commission Box */}
                                    <div className="mt-3">
                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    1.99% commission fee is required for early withdrawal.
                                                    No additional fees after 30 days lock term.
                                                </Tooltip>
                                            }
                                        >
                                            <div className="color-grey text-center">
                                                1.99% unstaking fee if withdrawn within 30d
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Card Col */}
                        <Col md={6} xl={4}>
                            <Card className="p-0 mb-4">
                                {/* Card Badge */}
                                <div className="position-absolute end-0 top-0 px-3 py-2 rounded m-2 bg-soft-red fw-500">
                                    <i className="fa-regular fa-clock-eight me-2" />
                                    90 days
                                </div>
                                {/* Card Header */}
                                <Card.Header className="p-4 border-bottom">
                                    <div className="d-flex align-items-center mb-4">
                                        <img
                                            className="rounded"
                                            src="./assets/images/token/fnz.png"
                                            width={50}
                                            height={50}
                                        />
                                        <div className="ms-4">
                                            <Card.Title className="card-title fs-20 fw-700 mb-0">
                                                Earn FNZ
                                            </Card.Title>
                                            <OverlayTrigger
                                                key="left"
                                                overlay={
                                                    <Tooltip id="tooltip-Apy">
                                                        APY is calculated when Harvest and Stake is made once in
                                                        30 days within a year
                                                    </Tooltip>
                                                }
                                            >
                                                <div className="color-grey fs-16 fw-500">Stake <u>APY</u> <span className="fw-700">3.40%</span></div>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    {/* Progress Bar  */}
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center fw-500 mx-1 mb-2">
                                            <div className="d-flex align-items-center">
                                                Total Stake
                                                <OverlayTrigger
                                                    key="right"
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-commission">
                                                            The total stake of tokens for all users in this pool
                                                        </Tooltip>
                                                    }
                                                >
                                                    <i className="fa-regular fa-circle-question color-grey ms-2" />
                                                </OverlayTrigger>
                                            </div>
                                            <div className="ms-auto">
                                                2048 <span className="color-grey">/ 4000</span>
                                            </div>
                                        </div>
                                        <ProgressBar
                                            variant="green"
                                            className="bg-light"
                                            now={68}
                                            style={{ height: "8px" }}
                                        />
                                    </div>
                                </Card.Header>
                                {/* Card Body */}
                                <Card.Body className="p-4">
                                    {/* List Box One */}
                                    <ListGroup className="list-unstyled mb-3 mx-1">
                                        <ListGroup.Item className="d-flex">
                                            <span className="me-auto color-grey">
                                                Total stake per user:
                                            </span>
                                            <span className="fw-500">24 FNZ</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* List Box Two */}
                                    <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                                        <ListGroup.Item className="d-flex align-items-center mb-3">
                                            <div className="d-flex align-items-center me-auto color-grey">
                                                Earned FNZ
                                                <Badge bg="soft-red" className="ms-2 p-2">Not active</Badge>
                                            </div>
                                            <Button variant="green btn-sm py-2 px-3 disabled">Harvest</Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex align-items-center">
                                            <span className="me-auto color-grey">Overview</span>
                                            <a href="#!" className="link" target="_blank">
                                                View contract{" "}
                                                <i className="fa-regular fa-arrow-up-right-from-square ms-2" />
                                            </a>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* Button */}
                                    <Button variant="primary d-flex align-items-center justify-content-center btn-sm w-100">
                                        <img
                                            className="rounded me-3"
                                            src="./assets/images/token/FNZ.png"
                                            width={24}
                                            height={24}
                                            style={{ outline: '2px solid var(--bg-primary)' }}
                                        />
                                        <span className="fs-16 fw-500">Approve TGR</span>
                                    </Button>
                                    {/* Commission Box */}
                                    <div className="mt-3">
                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    1.99% commission fee is required for early withdrawal.
                                                    No additional fees after 30 days lock term.
                                                </Tooltip>
                                            }
                                        >
                                            <div className="color-grey text-center">
                                                1.99% unstaking fee if withdrawn within 30d
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Card Col */}
                        <Col md={6} xl={4}>
                            <Card className="p-0 mb-4">
                                {/* Card Badge */}
                                <div className="position-absolute end-0 top-0 px-3 py-2 rounded m-2 bg-soft-red fw-500">
                                    <i className="fa-regular fa-clock-eight me-2" />
                                    90 days
                                </div>
                                {/* Card Header */}
                                <Card.Header className="p-4 border-bottom">
                                    <div className="d-flex align-items-center mb-4">
                                        <img
                                            className="rounded"
                                            src="./assets/images/token/ousdt.png"
                                            width={50}
                                            height={50}
                                        />
                                        <div className="ms-4">
                                            <Card.Title className="card-title fs-20 fw-700 mb-0">
                                                Earn oUSDT
                                            </Card.Title>
                                            <OverlayTrigger
                                                key="left"
                                                overlay={
                                                    <Tooltip id="tooltip-Apy">
                                                        APY is calculated when Harvest and Stake is made once in
                                                        30 days within a year
                                                    </Tooltip>
                                                }
                                            >
                                                <div className="color-grey fs-16 fw-500">Stake <u>APY</u> <span className="fw-700">1.82%</span></div>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    {/* Progress Bar  */}
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center fw-500 mx-1 mb-2">
                                            <div className="d-flex align-items-center">
                                                Total Stake
                                                <OverlayTrigger
                                                    key="right"
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-commission">
                                                            The total stake of tokens for all users in this pool
                                                        </Tooltip>
                                                    }
                                                >
                                                    <i className="fa-regular fa-circle-question color-grey ms-2" />
                                                </OverlayTrigger>
                                            </div>
                                            <div className="ms-auto">
                                                1700 <span className="color-grey">/ 3500</span>
                                            </div>
                                        </div>
                                        <ProgressBar
                                            variant="green"
                                            className="bg-light"
                                            now={56}
                                            style={{ height: "8px" }}
                                        />
                                    </div>
                                </Card.Header>
                                {/* Card Body */}
                                <Card.Body className="p-4">
                                    {/* List Box One */}
                                    <ListGroup className="list-unstyled mb-3 mx-1">
                                        <ListGroup.Item className="d-flex">
                                            <span className="me-auto color-grey">
                                                Total stake per user:
                                            </span>
                                            <span className="fw-500">12 oUSDT</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* List Box Two */}
                                    <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                                        <ListGroup.Item className="d-flex align-items-center mb-3">
                                            <div className="d-flex align-items-center me-auto color-grey">
                                                Earned oUSDT
                                                <Badge bg="soft-red" className="ms-2 p-2">Not active</Badge>
                                            </div>
                                            <Button variant="green btn-sm py-2 px-3 disabled">Harvest</Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex align-items-center">
                                            <span className="me-auto color-grey">Overview</span>
                                            <a href="#!" className="link" target="_blank">
                                                View contract{" "}
                                                <i className="fa-regular fa-arrow-up-right-from-square ms-2" />
                                            </a>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    {/* Button */}
                                    <Button variant="primary d-flex align-items-center justify-content-center btn-sm w-100">
                                        <img
                                            className="rounded me-3"
                                            src="./assets/images/token/ousdt.png"
                                            width={24}
                                            height={24}
                                            style={{ outline: '2px solid var(--bg-primary)' }}
                                        />
                                        <span className="fs-16 fw-500">Approve oUSDT</span>
                                    </Button>
                                    {/* Commission Box */}
                                    <div className="mt-3">
                                        <OverlayTrigger
                                            key="bottom"
                                            placement="bottom"
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>
                                                    1.99% commission fee is required for early withdrawal.
                                                    No additional fees after 30 days lock term.
                                                </Tooltip>
                                            }
                                        >
                                            <div className="color-grey text-center">
                                                1.99% unstaking fee if withdrawn within 30d
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="section py-5">
                <Container>
                    <h2 className="fs-32 fw-700 mb-5" id="FAQ">
                        FAQ
                    </h2>
                    <Accordion className="row">
                        <Col lg={6}>
                            {/* item */}
                            <Accordion.Item eventKey="0" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    Does the lock term period of 30,60, and 90 days restart after
                                    each additional stake?
                                </Accordion.Header>
                                <Accordion.Body>
                                    Yes. For example, today, you have staked 1 TON in the pool
                                    with a 60 days lock term. Right after the stake has been made,
                                    the timer was launched for 60 days, when you can harvest
                                    earnings with no fee. In 10 days, you decided to make an
                                    additional stake of 2 TON in the same pool. During this
                                    stake, the timer restarts and starts counting 60 days again.
                                    With this action, the rewards are not being withdrawn and
                                    remain on the balance.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="1" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    Can I unstake the total or partial amount from the pool?
                                </Accordion.Header>
                                <Accordion.Body>
                                    You can only make an unstake of the total amount of staked
                                    tokens. Once you make an unstake as not an early withdrawal,
                                    you receive the total amount of staked tokens + gained
                                    rewards.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="2" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    How much time does it take to make Harvest or Unstake?
                                </Accordion.Header>
                                <Accordion.Body>
                                    Harvest or unstake are usually immediate, but it might take up
                                    to 48 hours in some cases.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="3" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    When can I receive the rewards?
                                </Accordion.Header>
                                <Accordion.Body>
                                    The staking interest is distributed on a daily basis from
                                    12:00 PM (UTC) on the day after the funds are deposited to the
                                    contract to the end of the corresponding product period (given
                                    that the funds are deposited before 12:00 PM (UTC). The first
                                    payout is tied to each stake separately. For example, today,
                                    you have staked 10 TON in the pool with the 90-day lock term
                                    at 11:30 AM UTC. The first rewards will be credited at 12:00
                                    PM UTC on the next day.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    Do Fixed Staking pools continue to function after the 30/60/90
                                    days of lock term?
                                </Accordion.Header>
                                <Accordion.Body>
                                    Yes. Fixed Staking pools are dateless and keep functioning
                                    after the end of the lock term. The lock term identifies the
                                    number of days after which the fee for early withdrawal won’t
                                    be applied.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Col>
                        <Col lg={6}>
                            {/* item */}
                            <Accordion.Item eventKey="5" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    What is Fixed Staking on Tegro Finance?
                                </Accordion.Header>
                                <Accordion.Body>
                                    Fixed Staking allows you to stake a token and receive profit
                                    with a fixed APR in the same token. For example, Stake TON -
                                    Earn TON.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="6" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    What Fixed Staking pools are available on Tegro Finance?
                                </Accordion.Header>
                                <Accordion.Body>
                                    Currently, there are pools with the tokens: TON, ADA, DOT.
                                    More pools will be added in the future.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="7" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    Is there any impermanent loss in Fixed Staking?
                                </Accordion.Header>
                                <Accordion.Body>
                                    There is no impermanent loss. You can maximize your crypto
                                    funds safely and simply.
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="8" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    Is there any fee for early withdrawal from the pools?
                                </Accordion.Header>
                                <Accordion.Body>
                                    Yes. For each token, there will be 3 options of pools with the
                                    lock term at the time when the commission for early withdrawal
                                    is required: 30, 60 and 90 days. If you have staked in a pool
                                    and decide to withdraw earlier, the 1.99% commission will be
                                    required from the amount of the stake + what has already been
                                    credited as rewards.
                                    <p className="mt-3 mb-0">
                                        30/60/90 days - 1.99% fee from the amount of the stake
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* item */}
                            <Accordion.Item eventKey="9" className="card bg-second mb-3 p-0">
                                <Accordion.Header>
                                    When can I make Harvest from the pool?
                                </Accordion.Header>
                                <Accordion.Body>
                                    You can harvest your earned funds only after 30,60,90 days
                                    after the moment of staking. For example, you have staked 1
                                    TON in the 60-day lock term pool. You can harvest with no fee
                                    on the 61st day when you have earned 0.03 TON during the 60
                                    days period.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Col>
                    </Accordion>
                </Container>
            </section>
            <section className="py-5">
                <Container>
                    <div className="mb-4 pb-4 border-bottom">
                        <h2 className="fs-32 fw-700 mb-1">Terms of use</h2>
                        <p className="color-grey fw-500 fs-16">Revised: April 8, 2022</p>
                        <p className="mb-0 fs-18">
                            Please read the terms carefully as they govern <br /> your use of Tegro.Finance “Fixed Staking” services.
                        </p>
                    </div>
                    <Row>
                        <Col md={6}>
                            <ListGroup>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">01.</span>
                                    <span className="ms-3">
                                        By approving any of the contracts on this page, you agree that you have read, understood and accepted all of the terms and conditions stipulated in these Terms of Use, hereinafter referred to as “these Terms”.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">02.</span>
                                    <span className="ms-3">
                                        Reference to “you” and “your” in these Terms are references to any person using or accessing or attempting to use or access this page.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">03.</span>
                                    <span className="ms-3">
                                        By accessing, using or attempting to use Tegro “Fixed Staking” service in any capacity, you acknowledge that you unconditionally authorize Tegro to transfer your funds for further temporary staking to a third-party.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">04.</span>
                                    <span className="ms-3">
                                        By making use of Tegro “Fixed Staking” services you acknowledge and agree that you are aware of the risks associated with such services and shall assume all risks related to the use of such services.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">05.</span>
                                    <span className="ms-3">
                                        Tegro assumes all responsibility and liability for the funds deposited by users to the “Fixed Staking” contracts.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">06.</span>
                                    <span className="ms-3">
                                        By approving any of the contracts on this page, you acknowledge and agree that such actions represent your true investment decisions and you accept the potential risks and benefits of your investment decisions.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">07.</span>
                                    <span className="ms-3">
                                        The APY is adjusted daily based on the on-chain staking rewards, and the specific APY is subject to the page display on the day.
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={6}>
                            <ListGroup>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">08.</span>
                                    <span className="ms-3">
                                        You can withdraw your funds at any time otherwise stipulated by Tegro.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">09.</span>
                                    <span className="ms-3">
                                        The staking interest is distributed on a daily basis from 12:00 PM (UTC) on the day after the funds are deposited to the contract to the end of the corresponding product period (given that the funds are deposited before 12:00 PM (UTC).
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">10.</span>
                                    <span className="ms-3">
                                        By committing your tokens to be locked for periods ranging from 30 to 90 days, you acknowledge and agree that in case of an early redemption you will have to give up your earned interest and pay a withdrawal fee of 1.99% on your principle.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">11.</span>
                                    <span className="ms-3">
                                        By opting for an early redemption, you should fully recognize the risks associated with such actions and operate cautiously.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">12.</span>
                                    <span className="ms-3">
                                        Tegro may make changes to these Terms and to the information contained on this page at any time. Users undertake to refer to these Terms promptly and regularly. Tegro will not be held liable or responsible in any way of compensation should users incur personal losses arising from ignorance and/or negligence of these Terms.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">13.</span>
                                    <span className="ms-3">
                                        No communication or information provided to you by Tegro is intended as, or shall be considered or construed as, investment advice, financial advice, trading advice, recommendation to transact in any investment or solicitation to engage in any investment activity.
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="d-flex p-3">
                                    <span className="fw-500">14.</span>
                                    <span className="ms-3">
                                        If you do not agree to the aforementioned Terms you should refrain from using Tegro “Fixed Staking” services.
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
