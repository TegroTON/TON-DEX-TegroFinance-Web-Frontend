import React, { useState } from "react";
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
  Badge,
} from "react-bootstrap";
import FarmsTableItem from "./components/FarmsTableItem";

export function FarmsPage() {
  const [farmstableitems] = useState([
    {
      statusColor: "soft-red",
      statusName: "Hot",
      TokenImageFirst: "./assets/images/token/TGR.png",
      TokenImageSecond: "./assets/images/token/GGR.png",
      TokenNameFirst: "TGR",
      TokenNameSecond: "GGR",
      APR: "29.52%",
      APY: "34.34%",
      Liquidity: "$5 380 601",
      Erned: "-",
      AvailableLP: "0.0000 LP",
      AvailableLPUSD: "$0.0000",
      StakedLP: "0.0000 LP",
      StakedLPUSD: "$0.0000",
      EarnLP: "0.0000 LP",
      EarnLPUSD: "$0.0000",
    },
    {
      statusColor: "soft-red",
      statusName: "Hot",
      TokenImageFirst: "./assets/images/token/TGR.png",
      TokenImageSecond: "./assets/images/token/ousdt.png",
      TokenNameFirst: "TGR",
      TokenNameSecond: "USDT",
      APR: "30.53%",
      APY: "26.64%",
      Liquidity: "$9 703 931",
      Erned: "-",
      AvailableLP: "0.0000 LP",
      AvailableLPUSD: "$0.0000",
      StakedLP: "0.0000 LP",
      StakedLPUSD: "$0.0000",
      EarnLP: "0.0000 LP",
      EarnLPUSD: "$0.0000",
    },
    {
      statusColor: "soft-red",
      statusName: "Hot",
      TokenImageFirst: "./assets/images/token/TGR.png",
      TokenImageSecond: "./assets/images/token/lave.png",
      TokenNameFirst: "TGR",
      TokenNameSecond: "LAVE",
      APR: "19.8%",
      APY: "18.07%",
      Liquidity: "$242 514",
      Erned: "-",
      AvailableLP: "0.0000 LP",
      AvailableLPUSD: "$0.0000",
      StakedLP: "0.0000 LP",
      StakedLPUSD: "$0.0000",
      EarnLP: "0.0000 LP",
      EarnLPUSD: "$0.0000",
    },
    {
      statusColor: "soft-red",
      statusName: "Hot",
      TokenImageFirst: "./assets/images/token/ton.png",
      TokenImageSecond: "./assets/images/token/ggr.png",
      TokenNameFirst: "TON",
      TokenNameSecond: "GGR",
      APR: "14.15%",
      APY: "14.51%",
      Liquidity: "$27 087 300",
      Erned: "-",
      AvailableLP: "0.0000 LP",
      AvailableLPUSD: "$0.0000",
      StakedLP: "0.0000 LP",
      StakedLPUSD: "$0.0000",
      EarnLP: "0.0000 LP",
      EarnLPUSD: "$0.0000",
    },
    {
      statusColor: "soft-green",
      statusName: "Active",
      TokenImageFirst: "./assets/images/token/ousdc.png",
      TokenImageSecond: "./assets/images/token/virus.png",
      TokenNameFirst: "oUSDC",
      TokenNameSecond: "VIRUS",
      APR: "10.28%",
      APY: "9.79%",
      Liquidity: "$1 496 219",
      Erned: "-",
      AvailableLP: "0.0000 LP",
      AvailableLPUSD: "$0.0000",
      StakedLP: "0.0000 LP",
      StakedLPUSD: "$0.0000",
      EarnLP: "0.0000 LP",
      EarnLPUSD: "$0.0000",
    },
    {
      statusColor: "soft-red",
      statusName: "hot",
      TokenImageFirst: "./assets/images/token/idu.png",
      TokenImageSecond: "./assets/images/token/ddao.png",
      TokenNameFirst: "IDU",
      TokenNameSecond: "DDAO",
      APR: "29.52%",
      APY: "34.34%",
      Liquidity: "$5 380 601",
      Erned: "-",
      AvailableLP: "0.0000 LP",
      AvailableLPUSD: "$0.0000",
      StakedLP: "0.0000 LP",
      StakedLPUSD: "$0.0000",
      EarnLP: "0.0000 LP",
      EarnLPUSD: "$0.0000",
    },
  ]);
  const showFarmsTable = true;
  return (
    <>
      <section
        className="section hero bg-liner pt-5 border-bottom"
        style={{ paddingBottom: "96px" }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6} xl={5}>
              <h1 className="fw-800 mb-2" style={{ fontSize: "50px" }}>
                Farms
              </h1>
              <p className="mb-3 mb-md-4 fs-18 color-grey">
                Stake your LP tokens and earn TGR tokens in return.
                <span className="d-none d-md-inline">
                  We incentivize many liquidity pairs by offering our
                </span>
                <span className="d-none d-md-inline">
                  Liquidity Providers best farming opportunities.
                </span>
              </p>
              <Button variant="primary" href="#addproject">
                Add project
              </Button>
            </Col>
            <Col
              md={6}
              xl={4}
              className="ms-auto text-center d-none d-md-block"
            >
              <img
                src="./assets/images/girl-image.png"
                alt="Tegro Farms"
                width={244}
                height={310}
              />
            </Col>
          </Row>
        </Container>
         <div className="section__blur" style={{top: '-100px', marginLeft: '150px'}}>
          <div className="blur__circle-1" />
          <div className="blur__circle-2" />
        </div>
      </section>
      <section
        className="section position-relative mb-3 mb-lg-5"
        style={{ marginTop: "-60px", zIndex: "1" }}
      >
        <Container>
          <Row>
            <Col
              lg={6}
              className="d-flex align-items-center mb-4 mb-lg-0 order-1"
            >
              <Nav
                justify
                variant="pills"
                className="content-nav-pills d-flex align-items-center flex-nowrap flex-fill overflow-auto"
                style={{ height: "44px" }}
              >
                <Nav.Item>
                  <a href="#!" className="nav-link btn active py-2 fs-14">
                    Live
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a href="#!" className="nav-link btn py-2 fs-14">
                    Main
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a href="#!" className="nav-link btn py-2 fs-14">
                    Innovation
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a href="#!" className="nav-link btn py-2 fs-14">
                    GameFi
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a href="#!" className="nav-link btn py-2 fs-14">
                    Archive
                  </a>
                </Nav.Item>
              </Nav>
            </Col>
            <Col className="col-6 col-lg-2 d-flex align-items-center order-3 order-lg-2">
              <Form.Check
                type="switch"
                id="custom-switch"
                className="mb-0 ms-auto ms-lg-0"
                label={
                  <div
                    className="ms-1 position-relative"
                    style={{ top: "2px" }}
                  >
                    Staked only
                  </div>
                }
              />
            </Col>
            <Col className="col-6 col-lg-1 d-flex align-items-center order-2 order-lg-3">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light btn-sm"
                  style={{ height: "44px" }}
                >
                  All
                  <i className="fa-solid fa-angle-down ms-3"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" className="active">
                    All
                  </Dropdown.Item>
                  <Dropdown.Item href="#">APY</Dropdown.Item>
                  <Dropdown.Item href="#">Total staked</Dropdown.Item>
                  <Dropdown.Item href="#">Earned</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col className="col-12 col-lg-3 d-flex align-items-center order-4 order-lg-4 mt-3 mt-lg-0">
              <Form className="flex-fill ms-lg-3 ms-xl-0">
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
        </Container>
      </section>
      <section className="section pb-5">
        <Container>
          <Card className="p-0">
            {showFarmsTable ? (
              <>
                {farmstableitems.map((farmstableitem) => {
                  return (
                    <div className="flex-table">
                      <div className="flex-tbody">
                        <FarmsTableItem
                          statusColor={farmstableitem.statusColor}
                          statusName={farmstableitem.statusName}
                          TokenImageFirst={farmstableitem.TokenImageFirst}
                          TokenImageSecond={farmstableitem.TokenImageSecond}
                          TokenNameFirst={farmstableitem.TokenNameFirst}
                          TokenNameSecond={farmstableitem.TokenNameSecond}
                          APR={farmstableitem.APR}
                          APY={farmstableitem.APY}
                          Liquidity={farmstableitem.Liquidity}
                          Erned={farmstableitem.Erned}
                          AvailableLP={farmstableitem.AvailableLP}
                          AvailableLPUSD={farmstableitem.AvailableLPUSD}
                          StakedLP={farmstableitem.StakedLP}
                          StakedLPUSD={farmstableitem.StakedLPUSD}
                          EarnLP={farmstableitem.EarnLP}
                          EarnLPUSD={farmstableitem.EarnLPUSD}
                        />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="d-flex justify-content-center m-4">
                <div
                  className="badge bg-soft-red fs-14 fw-500 p-3 rounded-8 m-0"
                  style={{ maxWidth: "150px" }}
                >
                  No data yet
                </div>
              </div>
            )}
          </Card>
        </Container>
      </section>
      <section id="addproject">
        <Container className="border-bottom py-5">
          <Row className="align-items-center">
            <Col lg={6} className="d-none d-lg-block">
              <img
                src="./assets/images/planet-image.png"
                className="section__image"
                alt=""
              />
            </Col>
            <Col lg={5} className="ms-auto">
              <h2 className="fs-32 fw-900 mb-3">
                Launch Your Project{" "}
                <span className="d-block">on Toncoin Now!</span>
              </h2>
              <p className="mb-4 pb-2 fs-16 color-grey">
                Tegro Launchpool and Farms are platforms that help project teams
                promote their token and get exposure to thousands of active
                Tegro users across the globe. We look for strong teams with
                clear and innovative vision in the crypto space. If you think
                you are one of the projects, do not wait any longer and apply
                below.
              </p>
              <Button href="#!" target="_blank">
                Apply to Launch
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
