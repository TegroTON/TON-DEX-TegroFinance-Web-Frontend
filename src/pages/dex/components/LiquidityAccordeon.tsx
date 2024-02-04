import { Coins } from "ton3-core";
import { RemoveLiquidityModal } from "./modals/RemoveLiquidity";
import { Pool, Asset } from "../../../store/api/dexApiTypes";
import { CompleteProvideLiquidityButton } from "./CompleteProvideLiquidityButton";
import { useTranslation } from "react-i18next";

export interface LiquidityAccordeonProps {
  assets: { [key: string]: Asset };
  pool: Pool;
  idKey: string;
}

export function LiquidityAccordionComponent({
  assets,
  pool,
  idKey,
}: LiquidityAccordeonProps) {
  const { t } = useTranslation();

  const sharePercent = ((pool.lp_balance ?? 0) / pool.lp_total_supply) * 100;

  const asset0 = assets[pool.token0_address];
  const asset1 = assets[pool.token1_address];

  const token0Position = Coins.fromNano(
    ((pool.reserve0 * sharePercent) / 100).toFixed(0),
    asset0.decimals
  );
  const token1Position = Coins.fromNano(
    ((pool.reserve1 * sharePercent) / 100).toFixed(),
    asset1.decimals
  );

  const token0Balance = Coins.fromNano(
    pool.token0_balance,
    asset0.decimals
  ).toString();
  const token1Balance = Coins.fromNano(
    pool.token1_balance,
    asset1.decimals
  ).toString();

  const needsCompletion = token0Balance !== "0" || token1Balance !== "0";
  const hasPositions =
    pool.token0_balance > 0 ||
    pool.token1_balance > 0 ||
    (pool.lp_balance && pool.lp_balance > 0);

  return (
    <>
      <div className="accordion mb-4" id={`accordionLiquidity${idKey}`}>
        <div
          className="accordion-item py-4 collapsed"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${idKey}`}
          aria-expanded="false"
          aria-controls={`collapse${idKey}`}
        >
          <div className="d-flex">
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
            <div className="ms-3">
              <span className="fs-16 fw-700">{`${asset0.symbol} / ${asset1.symbol}`}</span>
              <p className="mb-0 text-muted fs-12">{`${asset0.display_name} / ${asset1.display_name}`}</p>
            </div>
            <div className="ms-auto">
              <span className="me-4 fw-500 text-muted" />
              <i className="fa-solid fa-angle-right" />
            </div>
          </div>
          <div
            id={`collapse${idKey}`}
            className="accordion-collapse mt-4 collapse"
            data-bs-parent={`#accordionLiquidity${idKey}`}
          >
            <ul className="list-unstyled bg-light p-3 rounded-8">
              <li className="list-item d-flex align-items-center mb-3">
                <img
                  src={asset0.image_url}
                  alt={asset0.symbol}
                  className="wc-img rounded-circle"
                  style={{ width: "14px", height: "14px" }}
                />
                <span className="ms-2 me-auto fw-500">
                  {t("liquidity.assetPosition", { symbol: asset0.symbol })}
                </span>
                <span className="text-muted">{`${token0Position} ${asset0.symbol}`}</span>
              </li>
              <li className="list-item d-flex align-items-center mb-3">
                <img
                  src={asset1.image_url}
                  alt={asset1.symbol}
                  className="wc-img rounded-circle"
                  style={{ width: "14px", height: "14px" }}
                />
                <span className="ms-2 me-auto fw-500">
                  {t("liquidity.assetPosition", { symbol: asset1.symbol })}
                </span>
                <span className="text-muted">{`${token1Position} ${asset1.symbol}`}</span>
              </li>
              {token0Balance !== "0" && (
                <li className="list-item d-flex align-items-center mb-3">
                  <img
                    src={asset0.image_url}
                    alt={asset0.symbol}
                    className="wc-img rounded-circle"
                    style={{ width: "14px", height: "14px" }}
                  />
                  <span className="ms-2 me-auto fw-500">
                    {t("liquidity.assetBalance", { symbol: asset0.symbol })}
                  </span>
                  <span className="text-muted">{`${token0Balance} ${asset0.symbol}`}</span>
                </li>
              )}
              {token1Balance !== "0" && (
                <li className="list-item d-flex align-items-center mb-3">
                  <img
                    src={asset1.image_url}
                    alt={asset1.symbol}
                    className="wc-img rounded-circle"
                    style={{ width: "14px", height: "14px" }}
                  />
                  <span className="ms-2 me-auto fw-500">
                    {t("liquidity.assetBalance", { symbol: asset1.symbol })}
                  </span>
                  <span className="text-muted">{`${token1Balance} ${asset1.symbol}`}</span>
                </li>
              )}
              <li className="list-item d-flex">
                <span className="me-auto color-blue fw-500">
                  {t("liquidity.shareInThePool")}
                </span>
                <span className="color-red fw-500">
                  {`${sharePercent.toFixed(2)}%`}
                </span>
              </li>
            </ul>
            <div className="d-flex justify-content-around mb-2 mt-3">
              {hasPositions && <RemoveLiquidityModal pool={pool} />}
              {needsCompletion && (
                <CompleteProvideLiquidityButton
                  token0Address={pool.token0_address}
                  token1Address={pool.token1_address}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
