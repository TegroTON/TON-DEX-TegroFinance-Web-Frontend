import React, { useContext, useEffect, useState } from 'react';
import { Coins } from 'ton3-core';
import { useForm } from 'react-hook-form';
import usePrefersColorScheme from 'use-prefers-color-scheme';
import { DexContext, DexContextType } from '../../context';
import { NavComponent } from './components/Nav';
import { calcOutAmountAndPriceImpact } from '../../ton/dex/utils';
import { Pair, Token } from '../../ton/dex/api/types';
import { PairData } from '../../types';
import { DeLabButtonLabel, DeLabConnector } from '../../deLabContext';
import { fieldNormalizer } from '../../utils';
import { UseFormatPriceImpact } from "../../hooks/useFormatPriceImpact";
import { UsePrintRoute } from "../../hooks/usePrintRoute";
import { useCalcPrice } from "../../hooks/useCalcPrice";
import { Container, Row, Col, Card, Button, ButtonGroup, Form, InputGroup, ListGroup } from 'react-bootstrap';

export function SymbolDetailPage() {

    const {
        swapLeft,
        swapRight,
        slippage,
        swapParams,
        updateSwapParams,
        walletInfo,
        tokens,
        swapPairs,
        switchSwap
    } = useContext(DexContext) as DexContextType;
    let {
        inAmount,
        outAmount,
    } = swapParams;


    // console.log(leftReserved)
    const price = useCalcPrice(swapPairs);

    // console.log("PRICE: ", price.toString());

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
        const value = getValues(side);
        if (value) {
            inAmount = new Coins(value);
            const [outAmount, priceImpact] = calcOutAmountAndPriceImpact(inAmount, swapPairs);
            setPriceImpact(priceImpact); // price_impact_trade_cake = amountInCAKE / (reserve_a_initial + amountInCAKE);
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

    setValue('left', inAmount.toString());
    setValue('right', outAmount.toString());


    return (
        <Container>
            <Row>
                <Col lg={5} xl={4} className="order-2 order-lg-1 mt-4 mt-lg-0">
                    <Card className="h-100">
                        <div className="sticky-top" style={{ top: '116px' }}>
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
                                                Balance: {' '} {`${(swapLeft.userBalance).toString().slice(0, 10)} ${swapLeft.token.symbol}`}
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
                                            <Button variant="outline-green p-2 fs-12 me-3">Max</Button>
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
                                                <span className="mx-3 fw-500 text-uppercase">
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
                                        onClick={switchSwap}
                                        className="swap-exchange-arrow__button p-2 border-0 form-check-label" htmlFor="swap-exchange-arrow">
                                        <i className="fa-solid fa-arrow-up-arrow-down"></i>
                                    </label>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <div className="d-flex justify-content-between mb-2 px-1">
                                        <Form.Label>You receive:</Form.Label>
                                        {walletInfo ? (
                                            <span className="small fw-500 color-grey">
                                                {'Balance: '} {`${(swapRight.userBalance).toString().slice(0, 10)} ${swapRight.token.symbol}`}
                                            </span>
                                        ) : ('')}
                                    </div>
                                    <InputGroup className="mb-3">
                                        <Form.Control className="bg-light"
                                            placeholder="0"
                                            defaultValue={outAmount.toString()}
                                            disabled
                                            {...register('right', {
                                                onChange: (event) => fieldNormalizer('right', event.target.value, setValue),
                                                validate: (value) => value && parseFloat(value) > 0,
                                            })}
                                        />
                                        <InputGroup.Text className="p-1 bg-light">
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
                                                <span className="mx-3 fw-500 text-uppercase">
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
                                        <span className="me-auto fw-500">Minimum received:</span>
                                        <span className="text-muted">
                                            {`${(minReceived ?? '0').toString()} ${swapRight.token.symbol}`}
                                        </span>
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
                                        isValid && !inAmount.isZero() ? (
                                            ((swapLeft.userBalance.gte(inAmount))) ? (
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
                        </div>
                    </Card>
                </Col>
                <Col lg={7} xl={8} className="order-1 order-lg-2">
                    <Card className="mb-4">
                        <div className="d-block d-lg-flex align-items-center mb-4">
                            <div className="d-flex me-auto">
                                <img src="/assets/images/token/eth.svg" width={40} height={40} alt="Ton Coin" />
                                <div className="ms-3">
                                    <span className="d-block fs-18 fw-500">Ethereum</span>
                                    <span className="d-block color-grey small">ETH</span>
                                </div>
                            </div>
                            <ButtonGroup className="border rounded-8 mt-3 mt-lg-0" role="group">
                                <Button variant="light btn-sm fs-12">1D</Button>
                                <Button variant="light btn-sm fs-12">7D</Button>
                                <Button variant="light btn-sm fs-12">1M</Button>
                                <Button variant="light btn-sm fs-12">3M</Button>
                                <Button variant="light btn-sm fs-12">1Y</Button>
                            </ButtonGroup>
                        </div>
                        <canvas id="TokenChart" style={{ height: '340px' }} />
                    </Card>
                    <Card>
                        <h2 className="fs-24 fw-700 mb-2">About</h2>
                        <p className="fw-500 fs-16 color-grey">ETH (Ethereum)</p>
                        <p>
                            Ethereum (ETH) is an open-source, public, blockchain-based distributed computing platform featuring smart contract (scripting) functionality, which facilitates online contractual agreements.
                        </p>
                        <p>
                            Ethereum also provides a cryptocurrency token called "ether", which can be transferred between accounts and used to compensate participant nodes for computations performed. "Gas", an internal transaction pricing mechanism, is used to mitigate spamand allocate resources on the network.The value token of the Ethereum blockchain is called ether.
                        </p>
                        <p>
                            It is listed under the diminutive ETH and traded on cryptocurrency exchanges. It is also used to pay for transaction fees and computational services on the Ethereum network.
                        </p>
                        <div className="bg-light p-4 rounded-8">
                            <ul className="list-unstyled mb-0">
                                <li className="list-item d-flex mb-3">
                                    <span className="me-auto fw-500">Issue Time</span>
                                    <span className="text-muted">2014-07-23</span>
                                </li>
                                <li className="list-item d-flex mb-3">
                                    <span className="me-auto fw-500">Total Supply</span>
                                    <span className="text-muted">109,542,949</span>
                                </li>
                                <li className="list-item d-flex mb-3">
                                    <span className="me-auto fw-500">Circulation</span>
                                    <span className="text-muted">109,542,949</span>
                                </li>
                                <li className="list-item d-flex mb-3">
                                    <span className="me-auto fw-500">White paper</span>
                                    <span className="text-muted">https://github.com/ethereum/wiki/wiki/White-Paper</span>
                                </li>
                                <li className="list-item d-flex mb-3">
                                    <span className="me-auto fw-500">Website</span>
                                    <span className="text-muted">https://www.ethereum.org/</span>
                                </li>
                                <li className="list-item d-flex">
                                    <span className="me-auto fw-500">Block Explorer</span>
                                    <span className="text-muted">https://www.yitaifang.com/</span>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}