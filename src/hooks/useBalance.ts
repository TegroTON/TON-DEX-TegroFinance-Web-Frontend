import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { Coins } from "ton3-core";
import {
  useGetAssetsQuery,
  useGetBalancesQuery,
} from "../store/api/dexApiSlice";

const TON_ADDRESS: string = import.meta.env.VITE_TON_ADDRESS;
const TGR_ADDRESS: string = import.meta.env.VITE_TEGRO_ADDRESS;

export interface Balance {
  tonBalance: Coins;
  tgrBalance: Coins;
}

export const useBalance = () => {
  const wallet = useTonWallet();
  const walletAddress = useTonAddress();

  const { data: assets } = useGetAssetsQuery();

  const { data: balances } = useGetBalancesQuery(walletAddress, {
    pollingInterval: 1000 * 20,
    skip: !wallet,
  });

  if (!balances || !assets) {
    return {
      tonBalance: Coins.fromNano(0, 9),
      tgrBalance: Coins.fromNano(0, 9),
    };
  }

  return {
    tonBalance: Coins.fromNano(
      balances[TON_ADDRESS] ?? 0,
      assets[TON_ADDRESS].decimals
    ),
    tgrBalance: Coins.fromNano(
      balances[TGR_ADDRESS] ?? 0,
      assets[TGR_ADDRESS]?.decimals ?? 9
    ),
  };
};
