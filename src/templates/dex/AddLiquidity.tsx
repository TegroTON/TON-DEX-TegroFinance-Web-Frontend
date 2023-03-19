import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Coins } from "ton3-core";
import { NavComponent } from "./components/Nav";
import { DexContext, DexContextType } from "../../context";
import { PairData } from "../../types";
import { Token } from "../../ton/dex/api/types";
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
import { CoinsToDecimals } from "../../ton/dex/utils";
import { ConfirmStakeModal } from "./components/modals/ConfirmStake";
import { ProcessingModal } from "./components/modals/Processing";

const calcShare = (amount: Coins, reserved: Coins): number => {
  if (reserved.isZero()) {
    return 0;
  } else {
    return Number(
      new Coins(amount)
        .div(new Coins(reserved).add(amount).toString())
        .toString()
    );
  }
};

export default function AddLiquidityPage() {
  const navigate = useNavigate();
  const go_back = () => navigate(-1);

  const {
    poolPair,
    poolParams,
    updatePoolParams,
    walletInfo,
    tokens,
    slippage,
  } = useContext(DexContext) as DexContextType;

  let { inAmount, outAmount } = poolParams;
  const {
    leftWallet,
    rightWallet,
    leftReserved,
    rightReserved,
    rightBalance,
    leftBalance,
    leftToken,
    rightToken,
  } = poolPair as PairData;

  const tonBalance = walletInfo?.balance ?? new Coins(0);

  const [share, setShare] = useState(0);

  const from = leftToken;
  const to = rightToken;

  const leftPrice = leftReserved.isZero()
    ? new Coins(0)
    : new Coins(rightReserved, { decimals: rightToken.decimals }).div(
        leftReserved.toString()
      );
  const rightPrice = rightReserved.isZero()
    ? new Coins(0)
    : new Coins(leftReserved, { decimals: leftToken.decimals }).div(
        rightReserved.toString()
      );

  const {
    register,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const [lastSide, setLastSide] = useState<"left" | "right">("left");

  const updateAmount = (side: "left" | "right") => {
    setLastSide(side);
    const value = getValues(side) ?? 0;
    // console.log('val', value);
    if (value) {
      // getStakeAmount(inAmount, lReserve, rReserve);
      if (side === "left") {
        inAmount = new Coins(Number(value).toFixed(leftToken.decimals), {
          decimals: leftToken.decimals,
        });
        outAmount = CoinsToDecimals(
          new Coins(inAmount).div(rightPrice.toString()),
          rightToken.decimals
        );
        try {
          setShare(calcShare(inAmount, leftReserved));
        } catch (e) {
          console.log(e);
        }
        updatePoolParams({
          ...poolParams,
          inAmount,
          outAmount,
        });
        setValue("right", outAmount.isPositive() ? outAmount.toString() : 0);
      } else {
        outAmount = new Coins(Number(value).toFixed(rightToken.decimals), {
          decimals: rightToken.decimals,
        });
        inAmount = CoinsToDecimals(
          new Coins(outAmount, { decimals: rightToken.decimals }).div(
            leftPrice.toString()
          ),
          leftToken.decimals
        );
        setShare(
          Number(
            new Coins(outAmount, { decimals: rightToken.decimals })
              .div(
                Number(
                  new Coins(rightReserved, { decimals: rightToken.decimals })
                    .add(outAmount)
                    .toString()
                )
              )
              .toString()
          )
        );
        updatePoolParams({
          ...poolParams,
          outAmount,
          inAmount,
        });
        setValue("left", inAmount.toString());
      }
    } else {
      inAmount = new Coins(0, { decimals: leftToken.decimals });
      outAmount = new Coins(0, { decimals: rightToken.decimals });
      setShare(0);
      updatePoolParams({
        ...poolParams,
        inAmount,
        outAmount,
      });
      setValue("right", outAmount.toString());
      setValue("left", outAmount.toString());
    }
  };

  useEffect(() => updateAmount(lastSide), [leftReserved, rightReserved]);

  let sufficient = 0;
  try {
    sufficient = !isValid
      ? 0
      : ((leftBalance && leftBalance.gte(inAmount)) ||
          (!leftBalance && tonBalance.gte(inAmount))) &&
        ((rightBalance && rightBalance.gte(outAmount)) ||
          (!rightBalance && tonBalance.gte(outAmount)))
      ? 1
      : -1;
  } catch {
    // pass
  }

  console.log("share", share);
  // console.log("res", leftReserved.toString(), rightReserved.toString())


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
              <Button variant="icon p-2" onClick={go_back} className="me-2">
                <i className="fa-regular fa-arrow-left" />
              </Button>
              <Card.Title className="card-title fw-600">
                Add Liquidity
              </Card.Title>
            </Card.Header>
            <Form className="p-4">
              <Form.Group className="mb-4">
                <Form.Label className="d-flex align-items-end mb-2 px-2">
                  <span className="fw-500"> {from.symbol}: </span>

                  {walletInfo ? (
                    <div className="text-end small fw-500 ms-auto">
                      <div className="color-grey">Balance:</div>
                      {`${(leftBalance ?? tonBalance).toString()} ${
                        from.symbol
                      }`}
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
                    >
                      <img
                        className="rounded-circle"
                        src={from.image}
                        width="24"
                        height="24"
                        alt={from.name}
                      />
                      <span className="mx-2 fw-500">{from.symbol}</span>
                    </Button>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="0"
                    type="text"
                    inputMode="decimal"
                    aria-invalid="false"
                    {...register("left", {
                      onChange: (event) => {
                        fieldNormalizer("left", event.target.value, setValue);
                        updateAmount("left");
                      },
                      validate: (value) => value && parseFloat(value) > 0,
                    })}
                  />
                </InputGroup>
              </Form.Group>
              {/*<Form.Group className="swap-exchange-arrow d-flex justify-content-center">*/}
              {/*    <Button variant="swap-exchange-arrow__button btn-light btn-icon">*/}
              {/*        <i className="fa-regular fa-arrow-up-arrow-down"></i>*/}
              {/*    </Button>*/}
              {/*</Form.Group>*/}
              <Form.Group className="mb-4">
                <Form.Label className="d-flex align-items-end mb-2 px-2">
                  <span className="fw-500"> {to.symbol}: </span>

                  {walletInfo ? (
                    <div className="text-end small fw-500 ms-auto">
                      <div className="color-grey">Balance:</div>
                      {`${(rightBalance ?? tonBalance).toString()} ${
                        to.symbol
                      }`}
                    </div>
                  ) : (
                    <></>
                  )}
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="p-1">
                    <Button
                      variant="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2"
                      style={{ width: "116px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#TokenModalRight"
                    >
                      <img
                        className="rounded-circle"
                        src={to.image}
                        width="24"
                        height="24"
                        alt={to.name}
                      />
                      <span className="mx-2 fw-500">{to.symbol}</span>
                      <i className="fa-solid fa-angle-down" />
                    </Button>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="0"
                    defaultValue={outAmount.toString()}
                    // disabled
                    {...register("right", {
                      onChange: (event) => {
                        fieldNormalizer("right", event.target.value, setValue);
                        updateAmount("right");
                      },
                      validate: (value) => value && parseFloat(value) > 0,
                    })}
                  />
                </InputGroup>
              </Form.Group>

              <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                <ListGroup.Item className="d-flex mb-3">
                  <span className="me-auto fw-500">{`${from.symbol} per ${to.symbol}`}</span>
                  <span className="text-muted">{rightPrice.toString()}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-3">
                  <span className="me-auto fw-500">{`${to.symbol} per ${from.symbol}`}</span>
                  <span className="text-muted">{leftPrice.toString()}</span>
                </ListGroup.Item>
                <ListGroup.Item className="list-item d-flex">
                  <span className="me-auto fw-500">Share of Pool:</span>
                  <span className="text-muted">
                    {`${(share * 100).toFixed(2)}%`}
                  </span>
                </ListGroup.Item>
              </ListGroup>
              {sufficient ? (
                sufficient > 0 ? (
                   <ConfirmStakeModal />
                ) : (
                  <div className="btn btn-red text-center fs-16 w-100 rounded-8 disabled">
                    {`Insufficient ${from.symbol} or ${to.symbol} balance`}
                  </div>
                )
              ) : (
                <div className="btn btn-red text-center fs-16 w-100 rounded-8 disabled">
                  Enter an amount
                </div>
              )}
            </Form>
          </Card>
          <div
            className="alert alert-dismissible card fade show mt-4 p-3"
            role="alert"
          >
            <div className="d-flex">
              <i className="fa-duotone fa-circle-info fs-24 color-blue mt-1" />
              <p className="ms-3 mb-0 pe-3 text-muted">
                By adding liquidity you'll earn 0.25% of all trades on this pair
                proportional to your share of the pool. Fees are added to the
                pool, accrue in real time and can be claimed by withdrawing your
                liquidity.
              </p>
            </div>
            <Button
              variant="icon btn-close rounded"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
