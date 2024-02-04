import navUa from "./nav-ua.json";
import swapUa from "./swap-ua.json";
import processingUa from "./processing-ua.json";
import walletUa from "./wallet-ua.json";
import commonUa from "./common-ua.json";
import liquidityUa from "./liquidity-ua.json";
import privacyUa from "./privacy-ua.json";

export const ua = {
  ...navUa,
  ...swapUa,
  ...processingUa,
  ...walletUa,
  ...commonUa,
  ...liquidityUa,
  ...privacyUa,
};
