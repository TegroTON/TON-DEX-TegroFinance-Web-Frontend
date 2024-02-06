import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type Props = {
  token0Address: string;
  token1Address: string;
};

export const CompleteProvideLiquidityButton = ({
  token0Address,
  token1Address,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`/liquidity/provide?t0=${token0Address}&t1=${token1Address}`}
      className="btn btn-primary btn-sm"
    >
      <i className="fa-regular fa-money-bill-transfer me-3" />
      {t("liquidity.complete")}
    </Link>
  );
};
