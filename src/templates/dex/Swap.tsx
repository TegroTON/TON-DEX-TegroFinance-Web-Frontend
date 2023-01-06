import React, { useContext, useEffect, useState } from 'react';
import { Coins } from 'ton3-core';
import { useForm } from 'react-hook-form';
import usePrefersColorScheme from 'use-prefers-color-scheme';
import { DexContext, DexContextType } from '../../context';
import { NavComponent } from './components/Nav';
import { getOutAmount } from '../../ton/dex/utils';
import { Token } from '../../ton/dex/api/types';
import { PairData } from '../../types';
import { DeLabButtonLabel, DeLabConnector } from '../../deLabContext';
import { fieldNormalizer } from '../../utils';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup } from 'react-bootstrap';

export default function SwapPage() {
    let colorScheme = usePrefersColorScheme();
    colorScheme = colorScheme === 'no-preference' ? 'dark' : colorScheme;
    const {
        swapPair,
        swapParams,
        updateSwapParams,
        walletInfo,
        tokens,
    } = useContext(DexContext) as DexContextType;
    let {
        slippage,
        inAmount,
        outAmount,
    } = swapParams;
    const {
        leftWallet,
        rightWallet,
        leftReserved,
        rightReserved,
        rightBalance,
        leftBalance,
        leftToken,
        rightToken,
    } = swapPair as PairData;

    const tonBalance = walletInfo?.balance ?? new Coins(0);

    const from = tokens?.find((t) => t.address.eq(leftToken)) as Token;

    const to = tokens?.find((t) => t.address.eq(rightToken)) as Token;

    const price = leftReserved.isZero()
        ? new Coins(0)
        : new Coins(rightReserved).div(leftReserved.toString());

    const [priceImpact, setPriceImpact] = useState(0);

    const realPrice = inAmount.isZero()
        ? new Coins(1).div(price.toString())
        : new Coins(inAmount).div(outAmount.toString());
    const minReceived = new Coins(outAmount).mul(1 - slippage / 100);

    const {
        register,
        setValue,
        getValues,
        formState: { isValid },
    } = useForm({ mode: 'onChange' });

    const updateAmount = (side: ('left' | 'right')) => {
        const [lReserve, rReserve] = side === 'left' ? [leftReserved, rightReserved] : [rightReserved, leftReserved];
        const value = getValues(side);
        if (value) {
            inAmount = new Coins(value);
            outAmount = getOutAmount(inAmount, lReserve, rReserve);
            setPriceImpact(Number(new Coins(inAmount).div(new Coins(lReserve).add(inAmount).toString()).mul(100).toString())); // price_impact_trade_cake = amountInCAKE / (reserve_a_initial + amountInCAKE);
            if (side === 'left') {
                updateSwapParams({
                    ...swapParams,
                    inAmount,
                    outAmount,
                });
            } else {
                updateSwapParams({
                    ...swapParams,
                    inAmount: outAmount,
                    outAmount: inAmount,
                });
            }
        } else {
            updateSwapParams({
                ...swapParams,
                inAmount: new Coins(0),
                outAmount: new Coins(0),
            });
            setPriceImpact(0);
        }
    };

    // const updater = async () => {
    //     // await updateDexInfo()
    //     // await updateAmount('left')
    // };

    useEffect(() => {
        // const interval = setInterval(() => updater(), 5000);
        //
        // return () => clearInterval(interval)
    }, []);

    // useEffect(() => {
    // }, [outAmount]);

    setValue('right', outAmount.toString());

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
                                            {'Balance: '} {`${(leftBalance ?? tonBalance).toString()} ${from.symbol}`}
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
                                        <Button variant="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2"
                                            style={{ minWidth: '124px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#TokenModalLeft"
                                        >
                                            <img
                                                src={from.image}
                                                width="24"
                                                height="24"
                                                alt={from.name}
                                            />
                                            <span className="mx-3 fw-500 text-uppercase">
                                                {from.symbol}
                                            </span>
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </Button>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <div className="d-flex justify-content-between mb-2 px-1">
                                    <Form.Label>You receive:</Form.Label>
                                    {walletInfo ? (
                                        <span className="small fw-500 color-grey">
                                            {'Balance: '} {`${(rightBalance ?? tonBalance).toString()} ${to.symbol}`}
                                        </span>
                                    ) : ('')}
                                </div>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="0"
                                        defaultValue={outAmount.toString()}
                                        disabled
                                        {...register('right', {
                                            onChange: (event) => fieldNormalizer('right', event.target.value, setValue),
                                            validate: (value) => value && parseFloat(value) > 0,
                                        })}
                                    />
                                    <InputGroup.Text className="p-1">
                                        <Button variant="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2"
                                            style={{ minWidth: '124px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#TokenModalRight"
                                        >
                                            <img
                                                src={to.image}
                                                width="24"
                                                height="24"
                                                alt={to.name}
                                            />
                                            <span className="mx-3 fw-500 text-uppercase">
                                                {to.symbol}
                                            </span>
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </Button>
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                                <ListGroup.Item className="list-item d-flex mb-3">
                                    <span className="me-auto fw-500">Price:</span>
                                    <span className="text-muted">
                                        {`${(realPrice ?? '0').toString()} ${from.symbol} per 1 ${to.symbol}`}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="list-item d-flex mb-3">
                                    <span className="me-auto fw-500">Slippage Tolerance:</span>
                                    <span className="text-muted">
                                        {`${slippage}%`}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="list-item d-flex mb-3">
                                    <span className="me-auto fw-500">Minimum received:</span>
                                    <span className="text-muted">
                                        {`${(minReceived ?? '0').toString()} ${to.symbol}`}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="list-item d-flex">
                                    <span className="me-auto fw-500">Price Impact:</span>
                                    <span className="text-muted">
                                        {`${priceImpact
                                            .toFixed(2)}%`}
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>
                            <>
                                {walletInfo?.isConnected ? (
                                    isValid ? (
                                        ((leftBalance && leftBalance.gte(inAmount)) || (!leftBalance && tonBalance.gte(inAmount))) ? (
                                            <Button variant="btn btn-green p-3 w-100"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#ConfirmSwap"
                                            >
                                                Exchange
                                            </Button>
                                        ) : (

                                            <div className="bg-soft-red text-center fw-500 p-3 w-100 rounded-8">
                                                {`Insufficient ${from.symbol} balance`}
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
