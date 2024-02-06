import { useTonConnectUI } from "@tonconnect/ui-react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export interface TonConnectCustomButtonProps {
  isMobile?: boolean;
}

export const TonConnectCustomButton = ({
  isMobile = false,
}: TonConnectCustomButtonProps) => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();

  return (
    <Button
      variant="primary w-100"
      size={isMobile ? "sm" : "lg"}
      type="button"
      onClick={() => {
        tonConnectUI.openModal();
      }}
    >
      <i className="fa-solid fa-wallet me-2" /> {t("swap.connectWallet")}
    </Button>
  );
};
