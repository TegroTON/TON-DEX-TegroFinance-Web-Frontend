import React, { useState } from "react";
import { Row, Col, Button, Collapse, Badge } from "react-bootstrap";
import Hints from "./Hints";
import FarmsCalcModal from "./modals/FarmsCalc";

function FarmsTableItem(props: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex-tr flex-row fw-500">
        <div className="flex-td flex-td__name d-flex align-items-center">
          <Badge
            bg={props.statusColor}
            className="order-2 order-md-1 rounded-8 fs-11 fw-700 me-0 me-md-3 ms-2 ms-md-0"
            style={{ width: "52px", padding: "8px" }}
          >
            {props.statusName}
          </Badge>
          <div className="order-1 order-md-2 d-flex align-items-center">
            <div className="d-flex align-items-center me-3">
              <img
                className="rounded-circle bg-light border"
                style={{ width: "32px", height: "32px", zIndex: "1" }}
                src={props.TokenImageFirst}
                alt={props.TokenNameFirst}
              />
              <img
                className="rounded-circle bg-light border"
                style={{ width: "32px", height: "32px", marginLeft: "-10px" }}
                src={props.TokenImageSecond}
                alt={props.TokenNameSecond}
              />
            </div>
            <div className="flex-td__TokenName text-nowrap">
              {props.TokenPairName}
            </div>
          </div>
        </div>
        <div className="flex-td flex-td__APY d-none d-lg-block">
          <div className="color-grey fs-12">APY</div>
          <span className="fw-500 me-1">{props.APY}</span>
          <Hints
            show="top"
            text="APY is based on your one-year income if Harvest and Compound are made once a day. Provided APY calculations depend on current APR rates."
            content={<i className="fa-regular fa-circle-question color-grey" />}
          />
        </div>
        <div className="flex-td flex-td__APR d-none d-lg-block">
          <div className="color-grey fs-12">
            <span className="me-1">APR</span>
            <Hints
              show="top"
              text="APR is calculated by summing up the rewards of the liquidity providers 5.37% and the rewards in BSW 28.72%"
              content={<i className="fa-regular fa-circle-question" />}
            />
          </div>
          <span className="fw-500 me-1">{props.APR}</span>
          <FarmsCalcModal />
        </div>
        <div className="flex-td flex-td__Liquidity d-none d-lg-block">
          <div className="color-grey fs-12">Liquidity</div>
          <span className="fw-500 me-1">{props.Liquidity}</span>
          <Hints
            show="top"
            text="The total value of the funds in this farm’s liquidity pool."
            content={<i className="fa-regular fa-circle-question color-grey" />}
          />
        </div>
        <div className="flex-td flex-td__Erned d-none d-lg-block">
          <div className="color-grey fs-12">Erned</div>
          <span className="fw-500 me-1">{props.Erned}</span>
        </div>
        <div className="flex-td d-flex align-items-cetner justify-content-end color-grey">
          <Button
            variant="link"
            className="color-blue p-0 border-0 me-4 fs-14"
            onClick={() => setOpen(!open)}
            aria-controls="flex-table__collapse"
            aria-expanded={open}
          >
            <span className="d-none d-md-inline">Details</span>
            <i className="fa-solid fa-angle-down ms-0 ms-md-2" />
          </Button>

          <Hints
            show="top"
            delay={{ hide: 1400 }}
            text={
              <>
                <p className="mb-0">Multiplier5.8X</p>
                <a href="#!" className="color-blue" target="_blank">
                  View contract{" "}
                  <i className="fa-regular fa-arrow-up-right-from-square ms-1" />
                </a>
              </>
            }
            content={<i className="fa-regular fa-circle-info fs-16" />}
          />
        </div>
      </div>
      <Collapse in={open}>
        <div id="flex-table__collapse">
          <Row className="d-flex d-lg-none border-bottom bg-light border-bottom p-3 p-lg-4">
            <Col className="col-6 col-sm-6 col-md-3 mb-3 mb-md-0">
              <div className="flex-td flex-td__APY p-0">
                <div className="color-grey fs-12">APY</div>
                <span className="fw-500 me-1">{props.APY}</span>
                <Hints
                  show="top"
                  text="APY is based on your one-year income if Harvest and Compound are made once a day. Provided APY calculations depend on current APR rates."
                  content={
                    <i className="fa-regular fa-circle-question color-grey" />
                  }
                />
              </div>
            </Col>
            <Col className="col-6 col-sm-6 col-md-3 mb-3 mb-3 mb-md-0 text-end text-md-start">
              <div className="flex-td flex-td__APR p-0">
                <div className="color-grey fs-12">
                  <span className="me-1">APR</span>
                  <Hints
                    show="top"
                    text="APR is calculated by summing up the rewards of the liquidity providers 5.21% and the rewards in TGR 29.10%"
                    content={<i className="fa-regular fa-circle-question" />}
                  />
                </div>
                <span className="fw-500 me-1">{props.APR}</span>
                <FarmsCalcModal />
              </div>
            </Col>
            <Col className="col-6 col-sm-6 col-md-3">
              <div className="flex-td flex-td__Liquidity p-0">
                <div className="color-grey fs-12">Liquidity</div>
                <span className="fw-500 me-1">{props.Liquidity}</span>
                <Hints
                  show="top"
                  text="The total value of the funds in this farm’s liquidity pool."
                  content={
                    <i className="fa-regular fa-circle-question color-grey" />
                  }
                />
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
            <Col
              md={12}
              lg={4}
              className="d-flex align-items-center mb-4 mb-lg-0"
            >
              <Button variant="light btn-sm order-2 order-lg-1">Get LP</Button>
              <div className="me-auto me-lg-0 ms-0 ms-lg-4  order-1 order-lg-2">
                <div className="fs-12 color-grey">Available LP</div>
                <div>
                  <span className="me-2 fw-500">{props.AvailableLP}</span>
                  <span className="color-grey fs-12">
                    ~ {props.AvailableLPUSD}
                  </span>
                </div>
              </div>
            </Col>
            <Col
              md={12}
              lg={4}
              className="d-flex align-items-center mb-4 mb-lg-0"
            >
              <Button variant="primary btn-sm order-2 order-lg-1 text-nowrap">
                Enable Farm
              </Button>
              <div className="me-auto me-lg-0 ms-0 ms-lg-4 order-1 order-lg-2">
                <div className="fs-12 color-grey">Staked LP</div>
                <div>
                  <span className="me-2 fw-500">{props.StakedLP}</span>
                  <span className="color-grey fs-12">
                    ~ {props.StakedLPUSD}
                  </span>
                </div>
              </div>
            </Col>
            <Col md={12} lg={4} className="d-flex align-items-center">
              <Button variant="green btn-sm order-2 order-lg-1 disabled">
                Horvest
              </Button>
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
