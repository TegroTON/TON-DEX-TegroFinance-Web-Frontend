import React, { useContext, useEffect, useState } from "react";
import { Coins } from "ton3-core";
import { useForm } from "react-hook-form";
import { DexContext, DexContextType } from "../../context";
import { NavComponent } from "./components/Nav";
import { DeLabConnector } from "../../deLabContext";
import { fieldNormalizer } from "../../utils";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { UseFormatPriceImpact } from "../../hooks/useFormatPriceImpact";
import { UsePrintRoute } from "../../hooks/usePrintRoute";
import { useCalcPrice } from "../../hooks/useCalcPrice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { log } from "util";
import { StartPair } from "../../types";
import { useLocation } from "react-router";
import { CoinsToDecimals } from "../../ton/dex/utils";
import { ConfirmSwapModal } from "./components/modals/ConfirmSwap";
import { ProcessingModal } from "./components/modals/Processing";
import { SettingsModal } from "./components/modals/Settings";

export default function SwapPage() {
  const navigator = useNavigate();
  const location = useLocation();
  const [firstRender, setFirstRender] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const {
    startPair,
    setStartPair,
    swapLeft,
    swapRight,
    slippage,
    setLeftSwapAmount,
    setRightSwapAmount,
    extract,
    setExtract,
    priceImpact,
    walletInfo,
    tokens,
    swapPairs,
    switchSwap,
    updateLock,
  } = useContext(DexContext) as DexContextType;

  if (firstRender && (from || to)) {
    setStartPair({ from, to });
  }

  const price = useCalcPrice(swapPairs);

  const realPrice =
    swapLeft.amount.isZero() || swapRight.amount.isZero()
      ? price.isZero()
        ? new Coins(0)
        : new Coins(1).div(price.toString())
      : CoinsToDecimals(
          new Coins(swapLeft.amount, { decimals: 18 }).div(
            swapRight.amount.toString()
          ),
          swapLeft.token.decimals
        );

  let minReceived = new Coins(0, { decimals: swapRight.token.decimals });
  let maxSold = new Coins(0, { decimals: swapLeft.token.decimals });

  try {
    minReceived = new Coins(swapRight.amount, {
      decimals: swapRight.token.decimals,
    }).mul(1 - slippage / 100);
    maxSold = new Coins(swapLeft.amount, {
      decimals: swapLeft.token.decimals,
    }).mul(1 + slippage / 100);
  } catch {
    // pass
  }

  const {
    register,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const updateAmount = (side: "left" | "right", value?: string) => {
    const _value = value || getValues(side);
    if (side === "left") {
      setLeftSwapAmount(
        new Coins(_value || "0", { decimals: swapLeft.token.decimals })
      );
      setExtract(false);
    } else {
      const pair = swapPairs[swapPairs.length - 1];
      const maxValue = Number(
        new Coins(pair.rightReserved, { decimals: pair.rightToken.decimals })
          .mul(0.999)
          .toString()
      );
      setRightSwapAmount(
        new Coins(Math.min(Number(_value || "0"), Number(maxValue)), {
          decimals: pair.rightToken.decimals,
        })
      );
      setExtract(true);
    }
  };

  useEffect(() => {
    const curLeft: string = getValues("left");
    const left = swapLeft.amount.toString();
    const curRight: string = getValues("right");
    const right = swapRight.amount.toString();
    if (
      left &&
      Number(curLeft) !== Number(left) &&
      (extract || curLeft.substring(curLeft.length - 1) !== ".")
    ) {
      setValue("left", left || "0");
    }
    if (
      right &&
      Number(curRight) !== Number(right) &&
      (!extract || curRight.substring(curRight.length - 1) !== ".")
    ) {
      setValue("right", right || "0");
    }
  }, [swapLeft.amount, swapRight.amount]);

  useEffect(() => {
    const fromAddr = swapLeft.token.address
      ? swapLeft.token.address.toString("raw")
      : null;
    const toAddr = swapRight.token.address
      ? swapRight.token.address.toString("raw")
      : null;
    const path = `/swap?${fromAddr ? "from=" + fromAddr : ""}${
      fromAddr && toAddr ? "&" : ""
    }${toAddr ? "to=" + toAddr : ""}`;
    const currentPath = location.pathname + location.search;
    console.log(currentPath, path);
    if (currentPath !== path) {
      navigator(path);
    }
  }, [swapPairs]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  const isRoute = swapPairs.length === 2;

  let sufficient = 0;
  let availableBalance = new Coins(0);
  try {
    const inAmount = extract ? maxSold : swapLeft.amount;
    availableBalance = new Coins(swapLeft.userBalance, {
      decimals: swapLeft.token.decimals,
    });
    availableBalance = swapLeft.token.address
      ? availableBalance
      : availableBalance.sub(new Coins(0.5));
    sufficient = inAmount.isZero()
      ? 0
      : availableBalance.gte(inAmount)
      ? 1
      : -1;
  } catch {
    // pass
  }

  const maxAmount = availableBalance.isPositive()
    ? availableBalance
    : new Coins(0);

  const [checked, setChecked] = useState(false);

  const [showConfirmSwap, setShowConfirmSwap] = useState(false);
  const toggleConfirmModal = () => {setShowConfirmSwap((current) => !current)}

  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const toggleProcessingModal = () => {setShowProcessingModal((current) => !current)}

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const toggleSettingsModal = () => {setShowSettingsModal((current) => !current)}


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={7} xl={5}>
          <NavComponent />
          <Card className="p-0">
            <Card.Header
              className="d-flex align-items-center border-bottom-light"
              style={{ padding: "20px 24px 20px 24px" }}
            >
              <Card.Title className="card-title fw-600 me-auto">
                Swap
              </Card.Title>
              <Button
                variant="icon p-0 border-0"
                onClick={toggleSettingsModal}
              >
                <i className="fa-regular fa-gear fa-lg" />
              </Button>
            </Card.Header>
            <Form className="p-4">
              <Form.Group className="mb-4">
                <Form.Label className="d-flex align-items-end mb-2 px-2">
                  <span className="fw-500"> From: </span>
                  <span className="color-grey ms-1">
                    {swapLeft.token.symbol}
                  </span>
                  {walletInfo ? (
                    <div className="text-end small fw-500 ms-auto">
                      <div className="color-grey">Balance:</div>
                      {swapLeft.userBalance.toString()} {swapLeft.token.symbol}
                    </div>
                  ) : (
                    <></>
                  )}
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="p-1">
                    <Button
                      variant="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2"
                      style={{ minWidth: "116px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#TokenModalLeft"
                    >
                      <img
                        className="rounded-circle"
                        src={swapLeft.token.image}
                        width="24"
                        height="24"
                        alt={swapLeft.token.name}
                      />
                      <span className="mx-2 fw-500">
                        {swapLeft.token.symbol}
                      </span>
                      <i className="fa-solid fa-angle-down" />
                    </Button>
                  </InputGroup.Text>
                  <Form.Control
                    className="fs-16 fw-500"
                    placeholder="0"
                    type="text"
                    inputMode="decimal"
                    aria-invalid="false"
                    autoComplete="off"
                    {...register("left", {
                      onChange: (event) => {
                        fieldNormalizer("left", event.target.value, setValue);
                        updateAmount("left");
                      },
                      validate: (value) => value && parseFloat(value) > 0,
                    })}
                  />
                  {/*<InputGroup.Text className="fs-12 fw-500 color-grey ps-1 pe-4">*/}
                  {/*    $0*/}
                  {/*</InputGroup.Text>*/}
                  <InputGroup.Text className="p-1">
                    <Button
                      variant="outline-primary fs-12 py-2 px-3"
                      onClick={() => {
                        updateAmount("left", maxAmount.toString());
                      }}
                    >
                      Max
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="swap-exchange-arrow d-flex justify-content-center">
                <input
                  className="swap-exchange-input-check"
                  type="checkbox"
                  value=""
                  id="swap-exchange-arrow"
                />
                <label
                  onClick={async () => {
                    !updateLock ? await switchSwap() : console.log();
                  }}
                  className="swap-exchange-arrow__button btn btn-icon p-2 border-0 form-check-label"
                  htmlFor="swap-exchange-arrow"
                >
                  <i className="fa-solid fa-arrow-up-arrow-down" />
                </label>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="d-flex align-items-end mb-2 px-2">
                  <span className="fw-500"> To: </span>
                  <span className="color-grey ms-1">
                    {swapRight.token.symbol}
                  </span>
                  {walletInfo ? (
                    <div className="text-end small fw-500 ms-auto">
                      <div className="color-grey">Balance:</div>
                      {swapRight.userBalance.toString()}
                      {swapRight.token.symbol}
                    </div>
                  ) : (
                    <></>
                  )}
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="p-1">
                    <Button
                      variant="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2"
                      style={{ minWidth: "116px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#TokenModalRight"
                    >
                      <img
                        className="rounded-circle"
                        src={swapRight.token.image}
                        width="24"
                        height="24"
                        alt={swapRight.token.name}
                      />
                      <span className="mx-2 fw-500">
                        {swapRight.token.symbol}
                      </span>
                      <i className="fa-solid fa-angle-down" />
                    </Button>
                  </InputGroup.Text>
                  <Form.Control
                    className="fs-16 fw-500"
                    placeholder="0"
                    type="text"
                    inputMode="decimal"
                    aria-invalid="false"
                    autoComplete="off"
                    disabled={isRoute}
                    {...register("right", {
                      onChange: (event) => {
                        fieldNormalizer("right", event.target.value, setValue);
                        updateAmount("right");
                      },
                      validate: (value) =>
                        !extract || (value && parseFloat(value) > 0),
                    })}
                  />
                  {/*<InputGroup.Text className="fs-12 fw-500 color-grey ps-1 pe-4">*/}
                  {/*    $0.0067*/}
                  {/*</InputGroup.Text>*/}
                </InputGroup>
              </Form.Group>
              <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">Price:</span>
                  <span className="color-grey">
                    {`${(realPrice ?? "0").toString().slice(0, 15)} ${
                      swapLeft.token.symbol
                    } per 1 ${swapRight.token.symbol}`}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">Slippage Tolerance:</span>
                  <span className="color-grey">{`${slippage}%`}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-2">
                  {extract ? (
                    <>
                      <span className="me-auto fw-500">Maximum sold:</span>
                      <span className="color-grey">
                        {`${(maxSold ?? "0").toString()} ${
                          swapLeft.token.symbol
                        }`}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="me-auto fw-500">Minimum received:</span>
                      <span className="color-grey">
                        {`${(minReceived ?? "0").toString()} ${
                          swapRight.token.symbol
                        }`}
                      </span>
                    </>
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">Price Impact:</span>
                  <span className="color-grey">
                    <UseFormatPriceImpact priceImpact={priceImpact} />
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex list-item">
                  <span className="me-auto fw-500">Route:</span>
                  <span className="color-grey">
                    <UsePrintRoute pairs={swapPairs} />
                  </span>
                </ListGroup.Item>
              </ListGroup>
              <>
                {walletInfo?.isConnected ? (
                  sufficient ? (
                    sufficient > 0 ? (
                      <>
                        <Button
                          variant="primary fs-16 w-100"
                          onClick={toggleConfirmModal}
                        >
                          Exchange
                        </Button>
                      </>
                    ) : (
                      <div className="btn btn-primary text-center fs-16 w-100 rounded-8 disabled">
                        {`Insufficient ${swapLeft.token.symbol} balance`}
                      </div>
                    )
                  ) : (
                    <div className="btn btn-primary text-center fs-16 w-100 rounded-8 disabled">
                      Enter an amount
                    </div>
                  )
                ) : (
                  <Button
                    variant="primary fs-16 w-100"
                    type="button"
                    onClick={() => DeLabConnector.openModal()}
                  >
                    Connect Wallet
                  </Button>
                )}
              </>
            </Form>
          </Card>
        </Col>
      </Row>
      {showConfirmSwap && (
        <ConfirmSwapModal
          toggle={toggleConfirmModal}
          processing={() => {
            setShowProcessingModal(true);
            setShowConfirmSwap(false);
          }}
        />
      )}
      {showProcessingModal && (
        <ProcessingModal toggle={toggleProcessingModal} />
      )}
      {showSettingsModal && (
        <SettingsModal toggle={toggleSettingsModal} />
      )}
    </Container>
  );
}
