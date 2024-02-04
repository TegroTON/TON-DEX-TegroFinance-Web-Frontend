import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react"
import { useTranslation } from "react-i18next";
import { useTonConnectUI, THEME, Theme, Locales } from "@tonconnect/ui-react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../store/features/themeSlice";


export const TonConnectButtonComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useSelector(selectTheme);
  
  const [tonConnectUI, setTonConnectUIOptions] = useTonConnectUI();
  setTonConnectUIOptions({
    uiPreferences: {
      theme: (theme === "dark-mode" ? THEME.DARK : THEME.LIGHT) as Theme,
      borderRadius: "s",
      colorsSet: {
        [THEME.DARK]: {
          connectButton: {
            background: "#06f",
          },
        },
        [THEME.LIGHT]: {
          connectButton: {
            background: "#06f",
          },
        },
      },
    },
    language: (i18n.language ?? "en") as Locales,
  });

  return (
    <TonConnectButton />
  )
}