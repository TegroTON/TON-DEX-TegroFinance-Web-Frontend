import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useBalance } from "../../../hooks/useBalance";
import { TonConnectCustomButton } from "./TonConnectCustomButton";
import { useClipboard } from "../../../hooks/useClipboard";

export interface AuthButtonProps {
  isMobile?: boolean;
}

export const AuthButton = ({ isMobile = false }: AuthButtonProps) => {
  const { t } = useTranslation();

  const [tonConnectUi] = useTonConnectUI();
  const wallet = useTonWallet();
  const address = useTonAddress();

  const { copied, copyToClipboard } = useClipboard(address);

  const { tgrBalance } = useBalance();

  if (!wallet) {
    return <TonConnectCustomButton isMobile={isMobile} />;
  }

  return (
    <NavDropdown
      className="box-blur border rounded-8 text-nowrap min-w-210"
      autoClose="outside"
      drop="down"
      align="end"
      title={
        <>
          <img
            className="rounded-circle"
            src="/static/ms-icon-310x310.png"
            width={18}
            height={18}
            alt="TGR"
          />
          <span className="fw-medium ms-2">
            {Number(tgrBalance.toString()).toFixed(0)} TGR
          </span>
          <i className="fa-solid fa-angle-down ms-3" />
        </>
      }
    >
      <NavDropdown.Item
        className="d-flex align-items-center"
        onClick={() => {
          copyToClipboard();
        }}
      >
        <i className="fa-light fa-copy dropdown-item-icon" />
        <div className="ms-3">
          {copied ? t("wallet.copied") : t("wallet.copyAddress")}
          <div
            className="text-truncate text-muted small"
            style={{ maxWidth: "150px" }}
          >
            {address.slice(0, 4)}...{address.slice(-4)}
          </div>
        </div>
      </NavDropdown.Item>
      <NavDropdown.Item
        className="d-flex align-items-center"
        onClick={() => tonConnectUi.disconnect()}
      >
        <i className="fa-light fa-power-off dropdown-item-icon" />
        <div className="ms-3">
          {t("wallet.disconnect")}
          <div className="text-muted small">{t("wallet.disconnectDesc")}</div>
        </div>
      </NavDropdown.Item>
    </NavDropdown>
  );
};
