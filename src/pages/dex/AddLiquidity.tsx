import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Coins } from "ton3-core";
import { fieldNormalizer } from "../../utils/fieldNormalizer";
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
import { ConfirmLiquidityModal } from "./components/modals/ConfirmLiquidity";
import { useDebounce } from "../../hooks/useDebounce";
import { SettingsModal } from "./components/modals/Settings";
import { useRouteAssets } from "../../hooks/useRouteAssets";
import { SelectAssetModal } from "./components/modals/SelectAssetModal";
import {
  useGetWalletPoolsQuery,
  useSimulateAddLiquidityQuery,
} from "../../store/api/dexApiSlice";
import { TonConnectCustomButton } from "./components/TonConnectCustomButton";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { useTranslation } from "react-i18next";

const fromAssetModalId = "from-asset-modal";
const toAssetModalId = "to-asset-modal";

const INPUT_DEBOUNCE = 250;

export interface AssetsState {
  asset0Symbol: string;
  asset1Symbol: string;
  asset0Amount: number;
  asset1Amount: number;
  share: number;
}

export default function AddLiquidityPage() {
  const { t } = useTranslation();

  const wallet = useTonWallet();

  const {
    token0Address,
    setToken0Address,
    token1Address,
    setToken1Address,
    token0Balance,
    token1Balance,
    token0Amount,
    setToken0Amount,
    token1Amount,
    setToken1Amount,
    assets,
    poolByAssetsAddressesHashMap,
  } = useRouteAssets();

  const address = useTonAddress();
  const { data: poolsWithBalance } = useGetWalletPoolsQuery(
    address?.toString() || "",
    {
      skip: address === "",
    }
  );

  const [share, setShare] = useState(0);
  const [minExpectedTokens, setMinExpectedTokens] = useState(0);
  const [expectedTokens, setExpectedTokens] = useState(0);

  const [slippageTolerance, setSlippageTolerance] = useState(0.5);

  const [lastUpdated, setLastUpdated] = useState<"token0" | "token1">("token0");

  const asset0 = assets?.[token0Address];
  const asset1 = assets?.[token1Address];

  let poolWithBalance = null;
  for (const pool of poolsWithBalance ?? []) {
    if (
      (pool.token0_address === asset0?.contract_address &&
        pool.token1_address === asset1?.contract_address) ||
      (pool.token0_address === asset1?.contract_address &&
        pool.token1_address === asset0?.contract_address)
    ) {
      poolWithBalance = pool;
      break;
    }
  }

  const pool =
    poolWithBalance ??
    poolByAssetsAddressesHashMap
      .get(asset0?.contract_address ?? "")
      ?.get(asset1?.contract_address ?? "");

  const needsCompletion =
    pool && (pool.token0_balance > 0 || pool.token1_balance > 0);

  const { register, setValue } = useForm({ mode: "onChange" });

  const token0PoolBalance = Coins.fromNano(
    (pool?.token0_address === asset0?.contract_address
      ? pool?.token0_balance ?? 0
      : pool?.token1_balance) ?? 0,
    asset0?.decimals ?? 9
  ).toString();
  const token1PoolBalance = Coins.fromNano(
    (pool?.token1_address === asset1?.contract_address
      ? pool?.token1_balance ?? 0
      : pool?.token0_balance) ?? 0,
    asset1?.decimals ?? 9
  ).toString();

  setValue("token0", token0Amount);
  setValue("token1", token1Amount);

  const { data: simulateData, isLoading } = useSimulateAddLiquidityQuery(
    {
      token0_address: asset0?.contract_address ?? "",
      token1_address: asset1?.contract_address ?? "",
      token0_amount:
        lastUpdated === "token0"
          ? new Coins(needsCompletion ? token0PoolBalance : token0Amount, {
              decimals: asset0?.decimals,
            })
              .toNano()
              .toString()
          : "0",
      token1_amount:
        lastUpdated === "token1"
          ? new Coins(needsCompletion ? token1PoolBalance : token1Amount, {
              decimals: asset1?.decimals,
            })
              .toNano()
              .toString()
          : "0",
      slippage_tolerance: slippageTolerance,
      user_wallet_address: address,
      lp_account_address: pool?.lp_account_address,
    },
    {
      skip:
        !asset0 ||
        !asset1 ||
        (token0Amount === 0 && token1Amount === 0 && !needsCompletion),
      pollingInterval: 10000,
    }
  );

  const currentShareOfPool =
    pool && pool.lp_balance && pool.lp_total_supply
      ? (pool?.lp_balance / pool?.lp_total_supply) * 100
      : 0;

  const updateAmounts = (asset: "token0" | "token1", amount: number) => {
    if (asset === "token0") {
      setLastUpdated("token0");
      setToken0Amount(Number(amount.toFixed(asset0?.decimals ?? 6)));
    } else {
      setLastUpdated("token1");
      setToken1Amount(Number(amount.toFixed(asset1?.decimals ?? 6)));
    }
  };
  const debouncedUpdateAmounts = useDebounce(updateAmounts, INPUT_DEBOUNCE);

  useEffect(() => {
    setToken0Amount(0);
    setToken1Amount(0);
    setShare(0);
  }, [token0Address, token1Address]);

  useEffect(() => {
    if (!simulateData) {
      return;
    }

    setToken0Amount(
      Number(
        Coins.fromNano(simulateData.token0_amount, asset0?.decimals).toString()
      )
    );
    setToken1Amount(
      Number(
        Coins.fromNano(simulateData.token1_amount, asset1?.decimals).toString()
      )
    );
    setShare(simulateData.estimated_share_of_pool);
    setMinExpectedTokens(simulateData.min_expected_tokens);
    setExpectedTokens(simulateData.expected_tokens);
  }, [simulateData]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={7} xl={5}>
          <Card className="p-2">
            <Card.Header
              className="d-flex align-items-center mb-0 mt-2"
              style={{ padding: "20px 24px 20px 24px" }}
            >
              {/* <Button variant="icon p-2" onClick={go_back} className="me-2">
                <i className="fa-regular fa-arrow-left" />
              </Button> */}
              <Card.Title className="card-title fs-24 fw-700 me-auto">
                {t("liquidity.addLiquidity")}
              </Card.Title>
              <SettingsModal
                slippageTolerance={slippageTolerance}
                setSlippageTolerance={setSlippageTolerance}
              />
            </Card.Header>
            <Form className="p-4 pt-0">
              <Form.Group className="mb-4">
                <Form.Label className="d-flex justify-content-between mb-2 px-1">
                  {wallet && (
                    <div className="text-end small fw-500 ms-auto color-grey">
                      {t("swap.balance")}{" "}
                      {`${token0Balance.toString()} ${asset0?.symbol}`}
                    </div>
                  )}
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    className="form-control fw-500 fs-18 px-3"
                    placeholder="0"
                    type="text"
                    inputMode="decimal"
                    aria-invalid="false"
                    autoComplete="off"
                    disabled={needsCompletion}
                    {...register("token0", {
                      onChange: (event) => {
                        fieldNormalizer(
                          "token0",
                          event.target.value || "0",
                          setValue,
                          asset0?.decimals
                        );
                        debouncedUpdateAmounts(
                          "token0",
                          parseFloat(event.target.value)
                        );
                      },
                      validate: (value) => value && parseFloat(value) > 0,
                    })}
                  />
                  <InputGroup.Text className="p-1">
                    <Button
                      variant="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2"
                      style={{ minWidth: "124px" }}
                      data-bs-toggle="modal"
                      data-bs-target={`#${fromAssetModalId}`}
                    >
                      <img
                        className="rounded-circle"
                        src={asset0?.image_url}
                        width="24"
                        height="24"
                        alt={asset0?.display_name}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "/static/assets/images/token/default-token-image.png")
                        }
                      />
                      <span className="mx-3 fw-500 text-uppercase">
                        {asset0?.symbol}
                      </span>
                      <i className="fa-solid fa-ellipsis-vertical" />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="d-flex align-items-end mb-2 px-2">
                  {wallet && (
                    <div className="text-end small fw-500 ms-auto color-grey">
                      {t("swap.balance")}{" "}
                      {`${token1Balance.toString()} ${asset1?.symbol}`}
                    </div>
                  )}
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    className="form-control fw-500 fs-18 px-3"
                    placeholder="0"
                    type="text"
                    inputMode="decimal"
                    aria-invalid="false"
                    autoComplete="off"
                    disabled={needsCompletion}
                    {...register("token1", {
                      onChange: (event) => {
                        fieldNormalizer(
                          "token1",
                          event.target.value || "0",
                          setValue,
                          asset1?.decimals
                        );
                        debouncedUpdateAmounts(
                          "token1",
                          parseFloat(event.target.value)
                        );
                      },
                      validate: (value) => value && parseFloat(value) > 0,
                    })}
                  />
                  <InputGroup.Text className="p-1">
                    <Button
                      variant="btn btn-sm btn-light d-flex align-items-center justify-content-center p-2"
                      style={{ minWidth: "124px" }}
                      data-bs-toggle="modal"
                      data-bs-target={`#${toAssetModalId}`}
                    >
                      <img
                        className="rounded-circle"
                        src={asset1?.image_url}
                        width="24"
                        height="24"
                        alt={asset1?.display_name}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "/static/assets/images/token/default-token-image.png")
                        }
                      />
                      <span className="mx-3 fw-500 text-uppercase">
                        {asset1?.symbol}
                      </span>
                      <i className="fa-solid fa-ellipsis-vertical" />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                <ListGroup.Item className="d-flex mb-3">
                  <span className="me-auto fw-500">APY 30d:</span>
                  <span className="text-muted">{`${(
                    (pool?.apy_30d ?? 0) * 100
                  ).toFixed(2)}%`}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-3">
                  <span className="me-auto fw-500">
                    {t("liquidity.minReceivedLPTokens")}
                  </span>
                  <span className="text-muted">
                    {Coins.fromNano(minExpectedTokens, 9).toString()}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-3">
                  <span className="me-auto fw-500">
                    {t("swap.blockchainFee")}
                  </span>
                  <span className="text-muted">0.26-0.6 TON</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-3">
                  <span className="me-auto fw-500">
                    {t("liquidity.estimatedShareOfPool")}
                  </span>
                  <span className="text-muted">+{`${share.toFixed(2)}%`}</span>
                </ListGroup.Item>
              </ListGroup>
              {!!currentShareOfPool && (
                <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                  <ListGroup.Item className="d-flex mb-3">
                    <span className="me-auto fw-500">
                      {t("liquidity.yourShareInThePool")}
                    </span>
                    <span className="text-muted">{`${currentShareOfPool.toFixed(
                      2
                    )}%`}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex mb-3">
                    <span className="me-auto fw-500">Your pool tokens:</span>
                    <span className="text-muted">
                      {Coins.fromNano(pool?.lp_balance ?? 0, 9).toString()}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              )}

              {wallet ? (
                isLoading ? (
                  <div className="btn btn-red text-center fs-16 w-100 rounded-8 disabled">
                    Loading...
                  </div>
                ) : token0Amount && token1Amount && asset0 && asset1 ? (
                  <ConfirmLiquidityModal
                    token0Amount={token0Amount}
                    token1Amount={token1Amount}
                    asset0={asset0}
                    asset1={asset1}
                    minExpectedTokens={minExpectedTokens}
                    expectedTokens={expectedTokens}
                    estimatedShare={share}
                    slippageTolerance={slippageTolerance}
                    simulateData={simulateData}
                    pool={pool}
                  />
                ) : (
                  <div className="btn btn-red text-center fs-16 w-100 rounded-8 disabled">
                    {t("swap.enterAmount")}
                  </div>
                )
              ) : (
                <TonConnectCustomButton />
              )}
            </Form>
          </Card>
          <div
            className="alert alert-dismissible card fade show mt-4 p-3"
            role="alert"
          >
            <div className="d-flex">
              <i className="fa-duotone fa-circle-info fs-24 color-blue mt-1" />
              <p className="ms-3 mb-0 pe-3 text-muted">{t("liquidity.desc")}</p>
            </div>
            <Button
              variant="icon btn-close rounded"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
        </Col>
      </Row>
      <SelectAssetModal
        currentAssetKey={token0Address}
        setCurrentAsset={setToken0Address}
        otherCurrentAssetKey={token1Address}
        setOtherCurrentAsset={setToken1Address}
        isFromModal={true}
        modalId={fromAssetModalId}
      />
      <SelectAssetModal
        currentAssetKey={token1Address}
        setCurrentAsset={setToken1Address}
        otherCurrentAssetKey={token0Address}
        modalId={toAssetModalId}
      />
    </Container>
  );
}
