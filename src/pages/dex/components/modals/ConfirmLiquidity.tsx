import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  useCompleteProvideLiquidityActivateQuery,
  useProvideLiquidityQuery,
  useCompleteProvideLiquidityQuery,
} from "../../../../store/api/dexApiSlice";
import {
  Asset,
  Pool,
  SimulateAddLiquidityResponse,
  TransactionData,
} from "../../../../store/api/dexApiTypes";
import { CheckModal } from "./CheckModal";
import { ProcessingModal } from "./Processing";
import { Coins } from "ton3-core";
import { useTranslation } from "react-i18next";
import { usePairBalances } from "../../../../hooks/usePairBalances";
import { useBalance } from "../../../../hooks/useBalance";
import {
  LiquidityProvideMessage,
  ProvideAction,
} from "../LiquidityProvideMessage";

const TON_ADDRESS: string = import.meta.env.VITE_TON_ADDRESS;

export interface ConfirmLiquidityProps {
  token0Amount: number;
  token1Amount: number;
  asset0: Asset;
  asset1: Asset;
  minExpectedTokens: number;
  expectedTokens: number;
  estimatedShare: number;
  slippageTolerance: number;
  simulateData?: SimulateAddLiquidityResponse;
  pool?: Pool;
}

export function ConfirmLiquidityModal({
  token0Amount,
  token1Amount,
  asset0,
  asset1,
  minExpectedTokens,
  expectedTokens,
  estimatedShare,
  slippageTolerance,
  simulateData,
  pool,
}: ConfirmLiquidityProps) {
  const { t } = useTranslation();

  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const { token0Balance, token1Balance } = usePairBalances({
    token0Address: asset0.contract_address,
    token1Address: asset1.contract_address,
  });
  const { tonBalance } = useBalance();

  const [showConfirmStake, setShowConfirmStake] = useState(false);

  const needsCompletion = simulateData?.action !== "provide";
  const needsActivation = simulateData?.action === "direct_add_provide";

  const [token0PoolBalance, token1PoolBalance] =
    asset0.contract_address === pool?.token0_address
      ? [pool?.token0_balance, pool?.token1_balance]
      : [pool?.token1_balance, pool?.token0_balance];

  const token0ToCompleteAmount = new Coins(token0Amount, {
    decimals: asset0.decimals,
  }).sub(Coins.fromNano(token0PoolBalance ?? 0, asset0.decimals));
  const token1ToCompleteAmount = new Coins(token1Amount, {
    decimals: asset1.decimals,
  }).sub(Coins.fromNano(token1PoolBalance ?? 0, asset1.decimals));

  // console.log(token0ToCompleteAmount);
  // console.log(token1ToCompleteAmount);

  const { data: provideTransactionData } = useProvideLiquidityQuery(
    {
      user_wallet_address: address,
      token0_address: asset0.contract_address,
      token1_address: asset1.contract_address,
      token0_amount: simulateData?.token0_amount?.toString() ?? "0",
      token1_amount: simulateData?.token1_amount?.toString() ?? "0",
      min_lp_out: simulateData?.min_expected_tokens?.toString() ?? "0",
    },
    {
      skip:
        address === "" || needsCompletion || !simulateData || !showConfirmStake,
      refetchOnMountOrArgChange: true,
    }
  );

  const secondTokenAddress =
    simulateData?.send_token_address === pool?.token0_address
      ? pool?.token1_address
      : pool?.token0_address;

  const { data: additionalProvideTransactionData } =
    useCompleteProvideLiquidityQuery(
      {
        user_wallet_address: address,
        token_address: simulateData?.send_token_address ?? "",
        second_token_address: secondTokenAddress ?? "",
        token_amount: simulateData?.send_amount?.toString() ?? "0",
        min_lp_out: simulateData?.min_expected_tokens.toString() ?? "0",
      },
      {
        skip:
          !needsCompletion ||
          needsActivation ||
          address === "" ||
          !simulateData ||
          !simulateData.send_amount ||
          !simulateData.send_token_address ||
          !secondTokenAddress ||
          !showConfirmStake,
        refetchOnMountOrArgChange: true,
      }
    );

  const { data: activateTransactionData } =
    useCompleteProvideLiquidityActivateQuery(
      {
        token0_amount: simulateData?.token0_amount?.toString() ?? "0",
        token1_amount: simulateData?.token1_amount?.toString() ?? "0",
        min_lp_out: simulateData?.min_expected_tokens?.toString() ?? "0",
        lp_account_address: pool?.lp_account_address ?? "",
      },
      {
        skip: !needsActivation || !simulateData || !pool || !showConfirmStake,
        refetchOnMountOrArgChange: true,
      }
    );

  const [transactionData, action]: [
    TransactionData | undefined,
    ProvideAction
  ] = needsActivation
    ? [activateTransactionData, "direct_add_provide"]
    : !needsCompletion
    ? [provideTransactionData, "provide"]
    : [additionalProvideTransactionData, "provide_additional_amount"];

  const handleConfirm = async () => {
    if (!transactionData) {
      return;
    }

    try {
      const response = await tonConnectUI?.sendTransaction({
        validUntil: transactionData.valid_until,
        messages: transactionData.messages.map((message) => ({
          address: message.to,
          amount: message.amount,
          payload: message.payload,
        })),
      });
      // console.log(response);
    } catch (e) {
      // console.log(e);
      // TODO: Transaction is canceled. Show Transaction canceled Modal.
    }
  };

  const toggleConfirmStakeModal = () => {
    setShowConfirmStake((current) => !current);
  };

  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const ProcessingModalClose = () => setShowProcessingModal(false);
  const ProcessingModalShow = () => setShowProcessingModal(true);

  const [showCheckModal, setShowCheckModal] = useState(false);
  const CheckModalClose = () => setShowCheckModal(false);
  const CheckModalShow = () => setShowCheckModal(true);

  const isEnoughBalance = () => {
    if (!asset0 || !asset1 || !tonConnectUI.connected) {
      return false;
    }

    let minRequiredTonBalance;
    if (needsActivation || needsCompletion) minRequiredTonBalance = 0.3;
    else minRequiredTonBalance = 0.6;

    if (TON_ADDRESS === asset0.contract_address) {
      minRequiredTonBalance += token0Amount;
    } else if (TON_ADDRESS === asset1.contract_address) {
      minRequiredTonBalance += token1Amount;
    }

    const enoughTonBalance = tonBalance.gte(
      new Coins(minRequiredTonBalance.toFixed(9), {
        decimals: 9,
      })
    );
    const enoughToken0Balance = token0Balance.gte(
      new Coins(token0Amount, { decimals: asset0.decimals })
    );
    const enoughToken1Balance = token1Balance.gte(
      new Coins(token1Amount, { decimals: asset1.decimals })
    );

    if (needsActivation) return enoughTonBalance;
    if (needsCompletion)
      return (
        enoughTonBalance &&
        (asset0.contract_address === simulateData?.send_token_address
          ? enoughToken0Balance
          : enoughToken1Balance)
      );

    return enoughTonBalance && enoughToken0Balance && enoughToken1Balance;
  };

  return (
    <>
      {!!simulateData && (
        <LiquidityProvideMessage
          action={simulateData.action}
          asset={
            simulateData?.send_token_address === asset0?.contract_address
              ? asset0
              : asset1
          }
          amount={simulateData.send_amount}
        />
      )}
      {isEnoughBalance() ? (
        <Button variant="red  fs-16 w-100" onClick={toggleConfirmStakeModal}>
          <i className="fa-regular fa-money-bill-transfer me-3" />
          {needsCompletion
            ? t("liquidity.confirm.complete")
            : t("liquidity.confirm.suggest")}
        </Button>
      ) : (
        <div className="btn btn-red text-center fs-16 w-100 rounded-8 disabled">
          {t("liquidity.insufficientBalance", {
            asset0: asset0?.symbol,
            asset1: asset1?.symbol,
          })}
        </div>
      )}
      <Modal
        show={showConfirmStake}
        onHide={toggleConfirmStakeModal}
        centered
        className="modal-dialog-centered mobile-modal-bottom"
        contentClassName="p-2"
      >
        <Modal.Header data-bs-dismiss="modal" aria-label="Close" closeButton>
          <Modal.Title>{t("liquidity.confirm.youGet")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-4">
            <div className="d-flex accordion-item__images">
              <img
                src={asset0.image_url}
                alt={asset0.symbol}
                className="wc-img"
                style={{ width: "40px", height: "40px" }}
              />
              <img
                src={asset1.image_url}
                alt={asset1.symbol}
                className="accordion-item__images-small"
              />
            </div>
            <div className="ms-4 text-start">
              <h4 className="fs-24 fw-700 mb-0">
                {Coins.fromNano(expectedTokens, 9).toString()} LP tokens
              </h4>
              <p className="mb-0 fw-500 color-grey">{`${asset0.symbol} / ${asset1.symbol}`}</p>
            </div>
          </div>
          <p className="mb-3 color-grey">
            {t("swap.confirm.transactionCompleteCondition.part1")}
            <span className="fw-700 color-blue">{`${slippageTolerance}%`}</span>
            {t("swap.confirm.transactionCompleteCondition.part2")}
          </p>
          <div className="card-alert p-3 bg-light rounded-8 mb-0">
            <ul className="list-unstyled">
              {!!token0PoolBalance && (
                <li className="list-item d-flex mb-3">
                  <span className="me-auto fw-500">
                    {t("liquidity.confirm.alreadyProvided")}
                  </span>
                  <span className="text-muted">
                    {Coins.fromNano(
                      token0PoolBalance ?? 0,
                      asset0?.decimals ?? 9
                    ).toString()}{" "}
                    {asset0?.symbol}
                  </span>
                </li>
              )}
              {!!token1PoolBalance && (
                <li className="list-item d-flex mb-3">
                  <span className="me-auto fw-500">
                    {t("liquidity.confirm.alreadyProvided")}
                  </span>
                  <span className="text-muted">
                    {Coins.fromNano(
                      token1PoolBalance ?? 0,
                      asset1?.decimals ?? 9
                    ).toString()}{" "}
                    {asset1?.symbol}
                  </span>
                </li>
              )}
              {!token0ToCompleteAmount.isZero() && (
                <li className="list-item d-flex mb-3">
                  <span className="me-auto fw-500">
                    {t("liquidity.confirm.provideToComplete")}
                  </span>
                  <span className="text-muted">
                    {token0ToCompleteAmount.toString()} {asset0?.symbol}
                  </span>
                </li>
              )}
              {!token1ToCompleteAmount.isZero() && (
                <li className="list-item d-flex mb-3">
                  <span className="me-auto fw-500">
                    {t("liquidity.confirm.provideToComplete")}
                  </span>
                  <span className="text-muted">
                    {token1ToCompleteAmount.toString()} {asset1?.symbol}
                  </span>
                </li>
              )}
              <li className="list-item d-flex mb-3">
                <span className="me-auto fw-500">
                  {t("liquidity.minReceivedLPTokens")}
                </span>
                <span className="text-muted">
                  {Coins.fromNano(
                    simulateData?.min_expected_tokens ?? "0",
                    9
                  ).toString()}
                </span>
              </li>
              <li className="list-item d-flex">
                <span className="me-auto fw-500">
                  {t("liquidity.yourShareInThePool")}
                </span>
                <span className="text-muted">
                  +{simulateData?.estimated_share_of_pool.toFixed(2)}%
                </span>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-light me-auto"
            onClick={toggleConfirmStakeModal}
          >
            {t("common.cancel")}
          </Button>
          {transactionData ? (
            <Button
              variant="red"
              onClick={async () => {
                setShowConfirmStake(false);
                setShowProcessingModal(true);
                await handleConfirm();
                setShowProcessingModal(false);
                setShowCheckModal(true);
              }}
            >
              <i className="fa-regular fa-circle-plus me-2" />
              {needsActivation
                ? t("liquidity.confirm.completeProvision")
                : t("liquidity.confirm.confirmProvision")}
            </Button>
          ) : (
            <div className="btn btn-red btn-primary text-center rounded-8 disabled">
              {t("common.preparingTransaction")}
            </div>
          )}
        </Modal.Footer>
      </Modal>

      <ProcessingModal
        toggleShow={showProcessingModal}
        toggleClose={ProcessingModalClose}
      />
      <CheckModal toggleShow={showCheckModal} toggleClose={CheckModalClose} />
    </>
  );
}
