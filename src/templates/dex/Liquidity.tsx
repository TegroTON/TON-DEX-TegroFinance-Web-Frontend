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
        updatePoolPositions,
    } = useContext(DexContext) as DexContextType;

    const testFunc = async () => {
        // const adapter = walletService.getWalletAdapter(walletInfo?.adapterId as string)
        // const jettonWallet = new JettonWalletContract(new Address("EQBk6YkDhzU1V67Dt_RcFOfPkW2pYdd6LDGomVSSL1xGdgUF"))
        // const dexPair = new DexBetaPairContract(new Address("EQBpLTnl0mciLdS52V6-Eh7h5TX4ivz-jOzVQoXI9ibHy9_i"))
        // const payload = dexPair.createAddLiquidityRequest(new Coins(5000), new Coins(35000), new Address("EQBmO_7SDGd7WRZQ5UEx0f-pG1uheNRW8wKoOuxJf9bqW3OJ"), jettonWallet)
        // await adapter.requestTransfer(walletInfo?.session, jettonWallet.address.toString(), "50500000000", BOC.toBase64Standard(payload), 300000)
        // const res = await axios.get('http://localhost:8080/pairs')
        // console.log('а что тут у нас?', res.data);
    };

    useEffect(() => {
        // testFunc().then();
        updatePoolPositions();
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={7} xl={5}>
                    <NavComponent />
                    <Card>
                        <Form>
                            <div className="mb-40">
                                <h2 className="card-title fs-24 fw-700 me-auto mb-2">Your Liquidity</h2>
                                <p className="mb-0 text-muted">Remove liquidity to receive tokens back</p>
                            </div>
                            {poolPositions && poolPositions.length > 0 ? (
                                poolPositions.map(
                                    (pp) => (
                                        <LiquidityAccordionComponent
                                            pair={pp.pair}
                                            lpBalance={pp.lpBalance}
                                        />
                                    ),
                                )
                            ) : (
                                <div className="bg-light text-center rounded-8 p-5 mb-4">
                                    <i className="fa-regular fa-cloud-arrow-down fa-4x mb-4 color-blue"></i>
                                    <p className="text-muted fs-16 mb-0">Your active V3 liquidity positions <br /> will appear here.</p>
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
