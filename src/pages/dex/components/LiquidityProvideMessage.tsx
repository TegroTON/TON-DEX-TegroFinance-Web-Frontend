import { useTranslation } from "react-i18next";
import { Asset } from "../../../store/api/dexApiTypes";
import { Coins } from "ton3-core";

export type ProvideAction =
  | "provide"
  | "provide_second"
  | "direct_add_provide"
  | "provide_additional_amount";

export interface LiquidityProvideMessageProps {
  action: ProvideAction;
  asset?: Asset;
  amount?: number;
}

export function LiquidityProvideMessage({
  action,
  asset,
  amount,
}: LiquidityProvideMessageProps) {
  const { t } = useTranslation();

  if (
    (action === "provide_additional_amount" || action === "provide_second") &&
    asset &&
    amount
  ) {
    return (
      <div className="alert alert-dismissible card fade show mt-4 p-3">
        <div className="d-flex">
          <i className="fa-duotone fa-circle-info fs-24 color-blue mt-1" />
          <p className="ms-3 mb-0 pe-3 text-muted ">
            {action === "provide_second" && (
              <>
                {t("liquidity.confirm.rateChangedMessage")}
                <br />
              </>
            )}
            {t("liquidity.confirm.additionalProvideMessage", {
              amount: Coins.fromNano(amount, asset.decimals).toString(),
              symbol: asset?.symbol,
            })}
          </p>
        </div>
      </div>
    );
  }

  if (action === "direct_add_provide") {
    return (
      <div className="alert alert-dismissible card fade show mt-4 p-3">
        <div className="d-flex">
          <i className="fa-duotone fa-circle-info fs-24 color-blue mt-1" />
          <p className="ms-3 mb-0 pe-3 text-muted">
            {t("liquidity.confirm.activationProvideMessage")}
          </p>
        </div>
      </div>
    );
  }

  return <></>;
}
