import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  useGetAssetsQuery,
  useGetWalletPoolsQuery,
} from "../../store/api/dexApiSlice";
import Hints from "./components/Hints";
import { LiquidityAccordionComponent } from "./components/LiquidityAccordeon";
import { TonConnectCustomButton } from "./components/TonConnectCustomButton";

export default function LiquidityPage() {
  const { t } = useTranslation();

  const wallet = useTonWallet();
  const address = useTonAddress();

  const { data: assets } = useGetAssetsQuery();
  const { data: pools } = useGetWalletPoolsQuery(address?.toString() || "", {
    skip: address === "",
    pollingInterval: 1000 * 60,
  });

  const poolsWithLpBalance = pools?.filter(
    (pool) =>
      (pool.lp_balance && pool.lp_balance > 0) ||
      pool.token0_balance > 0 ||
      pool.token1_balance > 0
  );

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={7} xl={5}>
          <Card className="p-1">
            <Card.Header
              className="d-flex align-items-center mt-1"
              style={{ padding: "20px 24px 20px 24px" }}
            >
              <div className="me-auto">
                <Card.Title className="card-title fs-24 fw-700 me-auto mb-2">
                  {t("liquidity.yourLiquidity")}
                </Card.Title>
                {wallet && pools && pools.length > 0 ? (
                  <p className="mb-0 text-muted">{t("liquidity.removeDesc")}</p>
                ) : (
                  <p className="mb-0 text-muted">{t("liquidity.addDesc")}</p>
                )}
              </div>
              <Hints
                show="top"
                text={t("liquidity.descHint")}
                content={
                  <Button variant="icon p-0 border-0">
                    <i className="fa-regular fa-circle-question fa-lg" />
                  </Button>
                }
              />
            </Card.Header>
            <Form className="p-4 pt-0">
              <h2 className="card-title fs-24 fw-700 me-auto mb-2"></h2>
              {wallet &&
              assets &&
              poolsWithLpBalance &&
              poolsWithLpBalance.length > 0 ? (
                poolsWithLpBalance.map((pool) => {
                  const key = pool.address;
                  return (
                    <LiquidityAccordionComponent
                      assets={assets}
                      pool={pool}
                      key={key}
                      idKey={key}
                    />
                  );
                })
              ) : (
                <div className="bg-light text-center rounded-8 p-5 my-4">
                  <i className="fa-light fa-cloud-arrow-down fa-4x mb-4 color-blue" />
                  <p className="text-muted fs-16 mb-0">
                    {t("liquidity.yourActivePositions")}
                  </p>
                </div>
              )}
              {!wallet ? (
                <TonConnectCustomButton />
              ) : (
                <Link
                  to="/liquidity/provide"
                  className="btn btn-red fs-16 w-100"
                >
                  <i className="fa-regular fa-money-bill-transfer me-3" />
                  {t("liquidity.addLiquidity")}
                </Link>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
