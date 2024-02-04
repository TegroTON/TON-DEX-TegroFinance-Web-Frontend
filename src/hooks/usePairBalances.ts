import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import {
  useGetAssetsQuery,
  useGetBalancesQuery,
} from "../store/api/dexApiSlice";
import { Coins } from "ton3-core";

export interface PairData {
  token0Address?: string;
  token1Address?: string;
}

export interface usePairBalancesData {
  token0Balance: Coins;
  token1Balance: Coins;
}

export const usePairBalances = (data: PairData) => {
  const wallet = useTonWallet();
  const walletAddress = useTonAddress();

  const { data: assets } = useGetAssetsQuery();

  const { data: balances } = useGetBalancesQuery(walletAddress, {
    pollingInterval: 1000 * 20,
    skip: !wallet,
  });

  if (!data.token0Address || !data.token1Address || !balances || !assets) {
    return {
      token0Balance: Coins.fromNano(0, 9),
      token1Balance: Coins.fromNano(0, 9),
    };
  }

  const token0Balance = Coins.fromNano(
    balances[data.token0Address] ?? 0,
    assets[data.token0Address].decimals
  );
  const token1Balance = Coins.fromNano(
    balances[data.token1Address] ?? 0,
    assets[data.token1Address].decimals
  );

  return {
    token0Balance,
    token1Balance,
  };
};
