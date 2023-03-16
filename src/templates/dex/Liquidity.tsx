import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { NavComponent } from "./components/Nav";
import { LiquidityAccordionComponent } from "./components/LiquidityAccordeon";
import { DexContext, DexContextType } from "../../context";
import { DeLabButtonLabel, DeLabConnector } from "../../deLabContext";
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
import Hints from "./components/Hints";

export default function LiquidityPage() {
  const {
    walletInfo,
    poolPositions,
    // updatePoolPositions,
    pairs,
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
          <Card className="p-0">
            <Card.Header
              className="d-flex align-items-center border-bottom-light"
              style={{ padding: "20px 24px 20px 24px" }}
            >
              <div className="me-auto">
                <Card.Title className="card-title fw-600 me-auto">
                  Your Liquidity
                </Card.Title>
                {walletInfo?.isConnected &&
                poolPositions &&
                poolPositions.length > 0 ? (
                  <p className="mb-0 text-muted">
                    Remove liquidity to receive tokens back
                  </p>
                ) : (
                  <p className="mb-0 text-muted">
                    Add liquidity to earn from commissions
                  </p>
                )}
              </div>
              <Hints
                show="top"
                text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below."
                content={
                  <Button variant="icon p-0 border-0">
                    <i className="fa-regular fa-circle-question fa-lg" />
                  </Button>
                }
              />
            </Card.Header>
            <Form className="p-4 pt-0">
              <h2 className="card-title fs-24 fw-700 me-auto mb-2"></h2>
              {walletInfo?.isConnected &&
              poolPositions &&
              poolPositions.length > 0 ? (
                poolPositions.map((pp, k) => {
                  const PAIR = pairs.find((p) => p.address.eq(pp.pair));
                  if (PAIR) {
                    return (
                      <LiquidityAccordionComponent
                        pair={PAIR}
                        poolPosition={pp}
                        key={k}
                        k={k}
                      />
                    );
                  }
                })
              ) : (
                <div className="bg-light text-center rounded-8 p-5 my-4">
                  <i className="fa-light fa-cloud-arrow-down fa-4x mb-4 color-blue"></i>
                  <p className="text-muted fs-16 mb-0">
                    Your active liquidity positions <br /> will appear here.
                  </p>
                </div>
              )}
              {!walletInfo?.isConnected ? (
                <Button
                  variant="primary fs-16 w-100"
                  type="button"
                  onClick={() => DeLabConnector.openModal()}
                >
                  Connect Wallet
                </Button>
              ) : (
                <Link to="/liquidity-add" className="btn btn-red fs-16 w-100">
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
