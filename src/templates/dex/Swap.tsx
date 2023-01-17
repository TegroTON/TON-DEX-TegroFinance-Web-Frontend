import React, { useContext, useEffect, useState } from 'react';
import { Coins } from 'ton3-core';
import { useForm } from 'react-hook-form';
import { DexContext, DexContextType } from '../../context';
import { NavComponent } from './components/Nav';
import { DeLabConnector } from '../../deLabContext';
import { fieldNormalizer } from '../../utils';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { UseFormatPriceImpact } from "../../hooks/useFormatPriceImpact";
import { UsePrintRoute } from "../../hooks/usePrintRoute";
import { useCalcPrice } from "../../hooks/useCalcPrice";
import {useNavigate, useSearchParams} from "react-router-dom";
import {log} from "util";

export default function SwapPage() {
    const navigator = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const {
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
        updateLock
    } = useContext(DexContext) as DexContextType;

    const price = useCalcPrice(swapPairs);

    const realPrice = swapLeft.amount.isZero() || swapRight.amount.isZero()
        ? price.isZero() ? new Coins(0) : new Coins(1).div(price.toString())
        : new Coins(swapLeft.amount).div(swapRight.amount.toString());

    let minReceived = new Coins(0, {decimals: swapRight.token.decimals});
    let maxSold = new Coins(0, {decimals: swapLeft.token.decimals});
    try {
        minReceived = new Coins(swapRight.amount, {decimals: swapRight.token.decimals}).mul(1 - slippage / 100);
        maxSold = new Coins(swapLeft.amount, {decimals: swapLeft.token.decimals}).mul(1 + slippage / 100);
    } catch {
        // pass
    }

    const {
        register,
        setValue,
        getValues,
        formState: { isValid },
    } = useForm({ mode: 'onChange' });

    const updateAmount = (side: ('left' | 'right')) => {
        const value = getValues(side);
        if (side === 'left') {
            setLeftSwapAmount(new Coins(value || "0", {decimals: swapLeft.token.decimals}));
            setExtract(false);
        } else {
            const pair = swapPairs[swapPairs.length - 1];
            const maxValue = Number(new Coins(pair.rightReserved, {decimals: pair.rightToken.decimals}).mul(0.999).toString())
            setRightSwapAmount(new Coins(Math.min(Number(value || "0"), Number(maxValue)), {decimals: pair.rightToken.decimals}));
            setExtract(true);
        }
    };

    useEffect(() => {
        const curLeft: string = getValues('left');
        const left = swapLeft.amount.toString();
        const curRight: string = getValues('right');
        const right = swapRight.amount.toString();
        if (left && curLeft !== left && (extract || curLeft.substring(curLeft.length - 1) !== '.')) {
            setValue('left', left || "0");
        }
        if (right && curRight !== right && (!extract || curRight.substring(curRight.length - 1) !== '.')) {
            setValue('right', right || "0");
        }
    }, [swapLeft.amount, swapRight.amount])


    const isRoute = swapPairs.length === 2;

    let sufficient = 0;
    try {
        const inAmount = extract ? maxSold : swapLeft.amount;
        sufficient = inAmount.isZero() ? 0 : swapLeft.userBalance.gte(inAmount) ? 1 : -1;
    } catch {
        // pass
    }

    const [checked, setChecked] = useState(false);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={7} xl={5}>
                    <NavComponent />
                    <Card>
                        <div className="d-flex align-items-center mb-4">
                            <h2 className="card-title fs-24 fw-700 me-auto">Swap</h2>
                            <Button variant="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#SettingsModal"><i className="fa-regular fa-gear fa-lg" /></Button>
                        </div>
                        <Form>
                            <Form.Group className="mb-4">
                                <div className="d-flex justify-content-between mb-2 px-1">
                                    <Form.Label>You pay:</Form.Label>
                                    {walletInfo ? (
                                        <span className="small fw-500 color-grey">
                                            Balance: {' '} {`${(swapLeft.userBalance).toString()} ${swapLeft.token.symbol}`}
                                        </span>
                                    ) : ('')}
                                </div>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="0"
                                        type="text"
                                        inputMode="decimal"
                                        aria-invalid="false"
                                        autoComplete="off"
                                        {...register('left', {
                                            onChange: (event) => {
                                                fieldNormalizer('left', event.target.value, setValue);
                                                updateAmount('left');
                                            },
                                            validate: (value) => value && parseFloat(value) > 0,
                                        })}
                                    />
                                    <InputGroup.Text className="p-1">
                                        {/*<Button variant="outline-light p-2 text-muted fs-11 me-3">Max</Button>*/}
                                        <Button variant="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2"
                                            style={{ minWidth: '124px' }}
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
                                            <span className="mx-3 fw-500">
                                                {swapLeft.token.symbol}
                                            </span>
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </Button>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="swap-exchange-arrow d-flex justify-content-center">
                                    <input className="swap-exchange-input-check" type="checkbox" value="" id="swap-exchange-arrow" />
                                    <label
                                        onClick={async () => {!updateLock ? await switchSwap() : console.log() }}
                                        className="swap-exchange-arrow__button p-2 border-0 form-check-label" htmlFor="swap-exchange-arrow">
                                        <i className="fa-solid fa-arrow-up-arrow-down"></i>
                                    </label>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <div className="d-flex justify-content-between mb-2 px-1">
                                    <Form.Label>You receive:</Form.Label>
                                    {walletInfo ? (
                                        <span className="small fw-500 color-grey">
                                            {'Balance: '} {`${(swapRight.userBalance).toString()} ${swapRight.token.symbol}`}
                                        </span>
                                    ) : ('')}
                                </div>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="0"
                                        type="text"
                                        inputMode="decimal"
                                        aria-invalid="false"
                                        autoComplete="off"
                                        disabled={isRoute}
                                        {...register('right', {
                                            onChange: (event) => {
                                                fieldNormalizer('right', event.target.value, setValue);
                                                updateAmount('right');
                                            },
                                            validate: (value) => !extract || (value && parseFloat(value) > 0),
                                        })}
                                    />
                                    <InputGroup.Text className="p-1">
                                        <Button variant="btn btn-sm btn-light border d-flex align-items-center justify-content-center p-2"
                                            style={{ minWidth: '124px' }}
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
                                            <span className="mx-3 fw-500">
                                                {swapRight.token.symbol}
                                            </span>
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </Button>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                                <ListGroup.Item className="d-flex mb-3">
                                    <span className="me-auto fw-500">Price:</span>
                                    <span className="text-muted">
                                        {`${(realPrice ?? '0').toString()} ${swapLeft.token.symbol} per 1 ${swapRight.token.symbol}`}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex mb-3">
                                    <span className="me-auto fw-500">Slippage Tolerance:</span>
                                    <span className="text-muted">
                                        {`${slippage}%`}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex mb-3">
                                    {extract ? (<>
                                        <span className="me-auto fw-500">Maximum sold:</span>
                                        <span className="text-muted">
                                            {`${(maxSold ?? '0').toString()} ${swapLeft.token.symbol}`}
                                        </span>
                                    </>) : (<>
                                        <span className="me-auto fw-500">Minimum received:</span>
                                        <span className="text-muted">
                                            {`${(minReceived ?? '0').toString()} ${swapRight.token.symbol}`}
                                        </span>
                                    </>)}
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex mb-3">
                                    <span className="me-auto fw-500">Price Impact:</span>
                                    <span className="text-muted">
                                        <UseFormatPriceImpact priceImpact={priceImpact} />
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex list-item">
                                    <span className="me-auto fw-500">Route:</span>
                                    <span className="text-muted">
                                        <UsePrintRoute pairs={swapPairs} />
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>
                            <>
                                {walletInfo?.isConnected ? (
                                    sufficient ? (
                                        (sufficient > 0) ? (
                                            <Button variant="btn btn-green p-3 w-100"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#ConfirmSwap"
                                            >
                                                Exchange
                                            </Button>
                                        ) : (

                                            <div className="bg-soft-red text-center fw-500 p-3 w-100 rounded-8">
                                                {`Insufficient ${swapLeft.token.symbol} balance`}
                                            </div>

                                        )
                                    ) : (
                                        <div className="bg-soft-green text-center fw-500 p-3 w-100 rounded-8">
                                            Enter an amount
                                        </div>

                                    )
                                ) : (
                                    <Button variant="primary p-3 w-100" type="button"
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
        </Container>
    );
}
