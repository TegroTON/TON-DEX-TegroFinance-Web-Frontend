import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Coins } from "ton3-core";
import { useDebounce } from "../../hooks/useDebounce";
import { PriceImpact } from "./components/PriceImpact";
import { useGetAssetsQuery } from "../../store/api/dexApiSlice";
import { fieldNormalizer } from "../../utils/fieldNormalizer";
import { SelectAssetModal } from "./components/modals/SelectAssetModal";
import { ConfirmSwapModal } from "./components/modals/ConfirmSwap";
import { SettingsModal } from "./components/modals/Settings";
import { useTranslation } from "react-i18next";
import { useTonWallet } from "@tonconnect/ui-react";
import { TonConnectCustomButton } from "./components/TonConnectCustomButton";
import { useSimulateSwap } from "../../hooks/useSimulateSwap";
import { usePairBalances } from "../../hooks/usePairBalances";
import { useBalance } from "../../hooks/useBalance";

export type SwapAction = "offer" | "ask";

const TON_ADDRESS: string = import.meta.env.VITE_TON_ADDRESS;
const TEGRO_ADDRESS: string = import.meta.env.VITE_TEGRO_ADDRESS;

const INPUT_DEBOUNCE = 250;

export default function SwapPage() {
  const { t, i18n } = useTranslation();

  const wallet = useTonWallet();

  const { data: assets } = useGetAssetsQuery();

  const [searchParams] = useSearchParams();
  let from = searchParams.get("from");
  let to = searchParams.get("to");

  if (from === to || !from || !to) {
    from = TON_ADDRESS;
    to = TEGRO_ADDRESS;
  }

  const [fromAssetKey, setFromAssetKey] = useState(from || TON_ADDRESS);
  const [toAssetKey, setToAssetKey] = useState(to || TEGRO_ADDRESS);

  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const [slippageTolerance, setSlippageTolerance] = useState(0.5);

  const [swapAction, setSwapAction] = useState<SwapAction>("offer");

  const { register, setValue } = useForm({ mode: "onChange" });

  const fromAsset = assets ? assets[fromAssetKey] : null;
  const toAsset = assets ? assets[toAssetKey] : null;

  const fromAmountNano =
    fromAsset && fromAmount
      ? new Coins(fromAmount.toFixed(fromAsset.decimals), {
          decimals: fromAsset.decimals,
        }).toNano()
      : "0";

  const toAmountNano =
    toAsset && toAmount
      ? new Coins(toAmount.toFixed(toAsset.decimals), {
          decimals: toAsset.decimals,
        }).toNano()
      : "0";

  const simulateState = useSimulateSwap({
    swapAction: swapAction,
    offerAddress: fromAsset?.contract_address,
    askAddress: toAsset?.contract_address,
    fromUnits: fromAmountNano,
    toUnits: toAmountNano,
    slippageTolerance: slippageTolerance,
  });

  const { tonBalance } = useBalance();

  const { token0Balance: fromAssetBalance, token1Balance: toAssetBalance } =
    usePairBalances({
      token0Address: fromAsset?.contract_address,
      token1Address: toAsset?.contract_address,
    });

  const realPrice = simulateState.swapRate > 0 ? 1 / simulateState.swapRate : 0;
  const minReceived = toAsset
    ? Coins.fromNano(simulateState.minAskUnits, toAsset.decimals)
    : new Coins(0);

  const fromAssetModalId = "from-asset-modal";
  const toAssetModalId = "to-asset-modal";

  useEffect(() => {
    if (!toAsset || !fromAsset) {
      return;
    }
    if (swapAction === "offer") {
      setToAmount(
        parseFloat(
          Coins.fromNano(simulateState.askUnits, toAsset.decimals).toString()
        )
      );
    } else {
      setFromAmount(
        parseFloat(
          Coins.fromNano(
            simulateState.offerUnits,
            fromAsset.decimals
          ).toString()
        )
      );
    }
  }, [simulateState]);

  useEffect(() => {
    from = fromAssetKey;
    to = toAssetKey;
    const url = new URL(window.location.toString());
    url.searchParams.set("from", from || TON_ADDRESS);
    url.searchParams.set("to", to || TEGRO_ADDRESS);
    window.history.pushState({}, "", url);
  }, [fromAssetKey, toAssetKey]);

  useEffect(() => {
    setValue(
      "toAmount",
      new Coins(toAmount, { decimals: toAsset?.decimals }).toString()
    );
  }, [toAmount]);

  useEffect(() => {
    setValue(
      "fromAmount",
      new Coins(fromAmount, { decimals: fromAsset?.decimals }).toString()
    );
  }, [fromAmount]);

  const swapFromTo = () => {
    setFromAssetKey(toAssetKey);
    setToAssetKey(fromAssetKey);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setSwapAction((prev) => (prev === "offer" ? "ask" : "offer"));
  };

  const updateFromAmount = (amount: number) => {
    if (typeof amount !== "number" || amount <= 0) {
      amount = 0;
      setToAmount(0);
    }
    setSwapAction("offer");
    setFromAmount(amount);
  };
  const debouncedUpdateFromAmount = useDebounce(
    updateFromAmount,
    INPUT_DEBOUNCE
  );

  const updateToAmount = (amount: number) => {
    if (typeof amount !== "number" || amount <= 0) {
      amount = 0;
      setFromAmount(0);
    }
    setSwapAction("ask");
    setToAmount(amount);
  };
  const debouncedUpdateToAmount = useDebounce(updateToAmount, INPUT_DEBOUNCE);

  const isEnoughTonBalance = (): boolean => {
    if (!wallet || !assets) {
      return false;
    }

    let requiredAmount = 0.3;

    if (fromAssetKey === TON_ADDRESS) {
      requiredAmount += fromAmount;
    }

    return tonBalance.gte(
      new Coins(requiredAmount.toFixed(assets[TON_ADDRESS].decimals), {
        decimals: assets[TON_ADDRESS].decimals,
      }).add(
        Coins.fromNano(simulateState.tonFeeUnits, assets[TON_ADDRESS].decimals)
      )
    );
  };

  const isEnoughAssetBalance = (): boolean => {
    if (!wallet || !assets) {
      return false;
    }

    return fromAssetBalance.gte(
      new Coins(fromAmount.toFixed(assets[fromAssetKey].decimals), {
        decimals: assets[fromAssetKey].decimals,
      })
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={7} xl={5}>
          <Card className="p-2">
            <Card.Header
              className="d-flex align-items-center mb-1 mt-2"
              style={{ padding: "20px 24px 0px 24px" }}
            >
              <Card.Title className="card-title fs-24 fw-700 me-auto">
                {t("swap.swap")}
              </Card.Title>
              <SettingsModal
                slippageTolerance={slippageTolerance}
                setSlippageTolerance={setSlippageTolerance}
              />
            </Card.Header>
            <Form className="p-4 pt-3">
              <Form.Group className="mb-4">
                <Form.Label className="d-flex justify-content-between mb-2 px-1">
                  <span className="fw-500"> {t("swap.youPay")} </span>
                  {wallet && (
                    <div className="text-end small fw-500 ms-auto color-grey">
                      {t("swap.balance")} {fromAssetBalance.toString()}{" "}
                      {fromAsset?.symbol}
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
                    {...register("fromAmount", {
                      onChange: (event) => {
                        fieldNormalizer(
                          "fromAmount",
                          event.target.value || "0",
                          setValue,
                          fromAsset?.decimals
                        );
                        debouncedUpdateFromAmount(
                          parseFloat(event.target.value)
                        );
                      },
                      validate: (value) => value && parseFloat(value) >= 0,
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
                        src={fromAsset?.image_url}
                        width="24"
                        height="24"
                        alt={fromAsset?.symbol}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "/static/assets/images/token/default-token-image.png")
                        }
                      />
                      <span className="mx-3 fw-500 text-uppercase">
                        {fromAsset?.symbol}
                      </span>
                      <i className="fa-solid fa-ellipsis-vertical" />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="swap-exchange-arrow d-flex justify-content-center">
                <input
                  className="swap-exchange-input-check"
                  type="checkbox"
                  value=""
                  id="swap-exchange-arrow"
                />
                <label
                  onClick={async () => {
                    swapFromTo();
                  }}
                  className="swap-exchange-arrow__button btn btn-icon p-2 border-0 form-check-label"
                  htmlFor="swap-exchange-arrow"
                >
                  <i className="fa-solid fa-arrow-up-arrow-down" />
                </label>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="d-flex justify-content-between mb-2 px-1">
                  <span className="fw-500"> {t("swap.youReceive")} </span>
                  {wallet && (
                    <div className="text-end small fw-500 ms-auto color-grey">
                      {t("swap.balance")} {toAssetBalance.toString()}{" "}
                      {toAsset?.symbol}
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
                    {...register("toAmount", {
                      onChange: (event) => {
                        fieldNormalizer(
                          "toAmount",
                          event.target.value || "0",
                          setValue,
                          toAsset?.decimals
                        );
                        debouncedUpdateToAmount(parseFloat(event.target.value));
                      },
                      validate: (value) => value && parseFloat(value) >= 0,
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
                        src={toAsset?.image_url}
                        width="24"
                        height="24"
                        alt={toAsset?.symbol}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "/static/assets/images/token/default-token-image.png")
                        }
                      />
                      <span className="mx-3 fw-500 text-uppercase">
                        {toAsset?.symbol}
                      </span>
                      <i className="fa-solid fa-ellipsis-vertical" />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <ListGroup className="list-unstyled bg-light p-3 rounded-8 mb-4">
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">{t("swap.price")}</span>
                  <span className="color-grey">
                    {`${(realPrice ?? "0")
                      .toFixed(fromAsset?.decimals)
                      .slice(0, 15)} ${fromAsset?.symbol} ${t("swap.per")} 1 ${
                      toAsset?.symbol
                    }`}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">
                    {t("swap.slippageTolerance")}
                  </span>
                  <span className="color-grey">{`${slippageTolerance}%`}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">
                    {t("swap.minimumReceived")}
                  </span>
                  <span className="color-grey">
                    {`${(minReceived ?? "0").toString()} ${toAsset?.symbol}`}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">
                    {t("swap.priceImpact")}
                  </span>
                  <span className="color-grey">
                    <PriceImpact priceImpact={simulateState.priceImpact} />
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">
                    {t("swap.blockchainFee")}
                  </span>
                  <span className="text-muted">0.08-0.3 TON</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">{t("swap.dexFee")}</span>
                  <span className="text-muted">
                    {Coins.fromNano(simulateState.tonFeeUnits, 9).toString()}{" "}
                    TON
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex mb-2">
                  <span className="me-auto fw-500">{t("swap.route")}</span>
                  <span className="color-grey">
                    {`${fromAsset?.symbol} > ${toAsset?.symbol}`}
                  </span>
                </ListGroup.Item>
              </ListGroup>
              <>
                {wallet ? (
                  "error" in simulateState ? (
                    <div className="btn btn-primary text-center fs-16 w-100 rounded-8 disabled">
                      {t("swap.error.insufficient_pool_liquidity", {
                        val: toAsset?.symbol,
                      })}
                    </div>
                  ) : !!fromAsset &&
                    !!toAsset &&
                    fromAmount > 0 &&
                    toAmount > 0 ? (
                    isEnoughAssetBalance() ? (
                      isEnoughTonBalance() ? (
                        <ConfirmSwapModal
                          fromAsset={fromAsset}
                          toAsset={toAsset}
                          fromAmount={fromAmount}
                          toAmount={toAmount}
                          minReceived={minReceived}
                          slippageTolerance={slippageTolerance}
                        />
                      ) : (
                        <div className="btn btn-primary text-center fs-16 w-100 rounded-8 disabled">
                          {t("swap.insufficientTonBalance")}
                        </div>
                      )
                    ) : (
                      <div className="btn btn-primary text-center fs-16 w-100 rounded-8 disabled">
                        {t("swap.insufficientAssetBalance", {
                          val: fromAsset?.symbol,
                        })}
                      </div>
                    )
                  ) : (
                    <div className="btn btn-primary text-center fs-16 w-100 rounded-8 disabled">
                      {t("swap.enterAmount")}
                    </div>
                  )
                ) : (
                  <TonConnectCustomButton />
                )}
              </>
            </Form>
          </Card>
        </Col>
      </Row>
      <SelectAssetModal
        currentAssetKey={fromAssetKey}
        setCurrentAsset={setFromAssetKey}
        otherCurrentAssetKey={toAssetKey}
        setOtherCurrentAsset={setToAssetKey}
        isFromModal={true}
        modalId={fromAssetModalId}
      />
      <SelectAssetModal
        currentAssetKey={toAssetKey}
        setCurrentAsset={setToAssetKey}
        otherCurrentAssetKey={fromAssetKey}
        modalId={toAssetModalId}
      />
    </Container>
  );
}
