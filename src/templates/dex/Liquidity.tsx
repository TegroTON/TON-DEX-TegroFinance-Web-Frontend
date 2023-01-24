import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { NavComponent } from './components/Nav';
import { LiquidityAccordionComponent } from './components/LiquidityAccordeon';
import { DexContext, DexContextType } from '../../context';
import { DeLabButtonLabel, DeLabConnector } from '../../deLabContext';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup } from 'react-bootstrap';

export default function LiquidityPage() {
    const {
        walletInfo,
        poolPositions,
        // updatePoolPositions,
        pairs
    } = useContext(DexContext) as DexContextType;

    // useEffect(() => {
    //     // testFunc().then();
    //     updatePoolPositions();
    //     return () => {};
    // }, [walletInfo?.balance, walletInfo?.isConnected, pairs]);

    // console.log(poolPositions)

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={7} xl={5}>
                    <NavComponent />
                    <Card>
                        <Form>
                            <div className="mb-40">
                                <h2 className="card-title fs-24 fw-700 me-auto mb-2">Your Liquidity</h2>
                                {walletInfo?.isConnected && poolPositions && poolPositions.length > 0 ? (
                                    <p className="mb-0 text-muted">Remove liquidity to receive tokens back</p>
                                ) : (
                                    <p className="mb-0 text-muted">Add liquidity to earn from commissions</p>
                                )}
                            </div>
                            {walletInfo?.isConnected && poolPositions && poolPositions.length > 0 ? (
                                poolPositions.map(
                                    (pp, k) => {
                                        const PAIR = pairs.find((p) => p.address.eq(pp.pair));
                                        if (PAIR) {
                                            return (
                                                <LiquidityAccordionComponent
                                                    pair={PAIR}
                                                    poolPosition={pp}
                                                    key={k}
                                                    k={k}
                                                />
                                            )
                                        }

                                    },
                                )
                            ) : (
                                <div className="bg-light text-center rounded-8 p-5 mb-4">
                                    <i className="fa-regular fa-cloud-arrow-down fa-4x mb-4 color-blue"></i>
                                    <p className="text-muted fs-16 mb-0">Your active liquidity positions <br /> will appear here.</p>
                                </div>
                            )}
                            {!walletInfo?.isConnected ? (
                                <Button variant="primary p-3 w-100" type="button"
                                    onClick={() => DeLabConnector.openModal()}
                                >
                                    Connect Wallet
                                </Button>
                            ) : (

                                <Link to="/liquidity-add" className="btn btn-red w-100">
                                    Add Liquidity
                                </Link>
                            )}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
