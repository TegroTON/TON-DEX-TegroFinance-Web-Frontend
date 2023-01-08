import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Coins } from 'ton3-core';
import { NavComponent } from './components/Nav';
import { DexContext, DexContextType } from '../../context';
import { PairData } from '../../types';
import { Token } from '../../ton/dex/api/types';
import { fieldNormalizer } from '../../utils';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup } from 'react-bootstrap';

export default function AddLiquidityPage() {
    const navigate = useNavigate();
    const go_back = () => navigate(-1);

    const {
        poolPair,
        poolParams,
        updatePoolParams,
        walletInfo,
        tokens,
        slippage
    } = useContext(DexContext) as DexContextType;

    let {
        inAmount,
        outAmount
    } = poolParams;
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

    const from = tokens?.find((t) => t.address.eq(leftToken.address)) as Token;

    const to = tokens?.find((t) => t.address.eq(rightToken.address)) as Token;
    const leftPrice = leftReserved.isZero()
        ? new Coins(0)
        : new Coins(rightReserved).div(leftReserved.toString());
    const rightPrice = rightReserved.isZero()
        ? new Coins(0)
        : new Coins(leftReserved).div(rightReserved.toString());

    const {
        register,
        setValue,
        getValues,
        formState: { isValid },
    } = useForm({ mode: 'onChange' });

    const [lastSide, setLastSide] = useState<('left' | 'right')>('left');

    const updateAmount = (side: ('left' | 'right')) => {
        setLastSide(side);
        const value = getValues(side) ?? 0;
        // console.log('val', value);
        if (value) {
            inAmount = new Coins(value);

            // getStakeAmount(inAmount, lReserve, rReserve);
            if (side === 'left') {
                outAmount = new Coins(inAmount).div(rightPrice.toString());
                setShare(Number(new Coins(inAmount).div(Number(new Coins(leftReserved).add(inAmount).toString())).toString()))
                updatePoolParams({
                    ...poolParams,
                    inAmount,
                    outAmount
                });
                setValue('right', outAmount.toString());
            } else {
                outAmount = new Coins(inAmount).div(leftPrice.toString());
                setShare(Number(new Coins(inAmount).div(Number(new Coins(rightReserved).add(inAmount).toString())).toString()))
                updatePoolParams({
                    ...poolParams,
                    outAmount: inAmount,
                    inAmount: outAmount
                });
                setValue('left', outAmount.toString());
            }
        } else {
            inAmount = new Coins(0);
            outAmount = new Coins(0);
            setShare(0);
            updatePoolParams({
                ...poolParams,
                inAmount,
                outAmount,
            });
            setValue('right', outAmount.toString());
            setValue('left', outAmount.toString());
        }
    };

    useEffect(() => updateAmount(lastSide), [leftReserved, rightReserved]);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={7} xl={5}>
                    <NavComponent />
                    <Card>
                        <Form>
                            <div className="d-flex align-items-center mb-4">
                                <Button variant="btn btn-light p-2" onClick={go_back} className="me-3">
                                    <i className="fa-regular fa-arrow-left" />
                                </Button>
                                <h2 className="card-title fs-24 fw-700 me-auto">
                                    Add Liquidity
                                </h2>
                            </div>

                            <Form.Group className="mb-4">
                                <div className="d-flex justify-content-between mb-2 px-1">
                                    <Form.Label>{from.symbol}:</Form.Label>
                                    {walletInfo ? (
                                        <span className="small fw-500 color-grey">
                                            Balance: {' '} {`${(leftBalance ?? tonBalance).toString()} ${from.symbol}`}
                                        </span>
                                    ) : ('')}
                                </div>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="0"
                                        type="text"
                                        inputMode="decimal"
                                        aria-invalid="false"
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
                            {/*<Form.Group className="swap-exchange-arrow d-flex justify-content-center">*/}
                            {/*    <Button variant="swap-exchange-arrow__button btn-light btn-icon">*/}
                            {/*        <i className="fa-regular fa-arrow-up-arrow-down"></i>*/}
                            {/*    </Button>*/}
                            {/*</Form.Group>*/}
                            <Form.Group className="mb-4">
                                <div className="d-flex justify-content-between mb-2 px-1">
                                    <Form.Label>{to.symbol}:</Form.Label>
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
                                        // disabled
                                        {...register('right', {
                                            onChange: (event) => {
                                                fieldNormalizer('right', event.target.value, setValue);
                                                updateAmount('right');
                                            },
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
                                <ListGroup.Item className="d-flex mb-3">
                                    <span className="me-auto fw-500">{`${from.symbol} per ${to.symbol}`}</span>
                                    <span className="text-muted">
                                        {rightPrice.toString()}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex mb-3">
                                    <span className="me-auto fw-500">{`${to.symbol} per ${from.symbol}`}</span>
                                    <span className="text-muted">
                                        {leftPrice.toString()}
                                    </span>
                                </ListGroup.Item>
                                <ListGroup.Item className="list-item d-flex">
                                    <span className="me-auto fw-500">Share of Pool:</span>
                                    <span className="text-muted">
                                        {`${(share * 100).toFixed(2)}%`}
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>
                            {isValid ? (
                                (((leftBalance && leftBalance.gte(inAmount)) || (!leftBalance && tonBalance.gte(inAmount)))
                                    && ((rightBalance && rightBalance.gte(outAmount)) || (!rightBalance && tonBalance.gte(outAmount))))
                                    ? (
                                        <Button
                                            className="btn btn-primary w-100"
                                            data-bs-toggle="modal"
                                            data-bs-target="#ConfirmStake"
                                        >
                                            Add Liquidity
                                        </Button>
                                    ) : (
                                        <div className="bg-soft-red text-center fw-500 p-3 w-100 rounded-8">
                                            {`Insufficient ${from.symbol} or ${to.symbol} balance`}
                                        </div>
                                    )
                            ) : (
                                <div className="bg-soft-green text-center fw-500 p-3 w-100 rounded-8">
                                    Enter an amount
                                </div>
                            )}
                        </Form>
                    </Card>
                    <div className="alert alert-dismissible bg-light rounded shadow border-0 fade show mt-40 p-4" role="alert">
                        <div className="d-flex">
                            <i className="fa-regular fa-circle-info fa-2x color-red mt-1" />
                            <p className="ms-3 mb-0 pe-3 text-muted">
                                By adding liquidity you'll earn 0.17% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing
                                your liquidity.
                            </p>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
