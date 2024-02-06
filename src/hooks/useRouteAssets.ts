import { useSearchParams } from "react-router-dom";
import { useGetAssetsQuery, useGetPoolsQuery, useGetWalletPoolsQuery } from "../store/api/dexApiSlice";
import { useEffect, useState } from "react";
import { Pool, Asset } from "../store/api/dexApiTypes";
import { usePairBalances } from "./usePairBalances";
import { Coins } from "ton3-core";

const TON_ADDRESS = import.meta.env.VITE_TON_ADDRESS || "";
const TEGRO_ADDRESS = import.meta.env.VITE_TEGRO_ADDRESS || "";

export interface RouteAssets {
  token0Address: string;
  setToken0Address: (value: string) => void;
  token1Address: string;
  setToken1Address: (value: string) => void;
  token0Balance: Coins;
  token1Balance: Coins;
  token0Amount: number;
  setToken0Amount: (value: number) => void;
  token1Amount: number;
  setToken1Amount: (value: number) => void;
  assets: { [key: string]: Asset } | undefined;
  pools: Pool[] | undefined;
  poolByAssetsAddressesHashMap: Map<string, Map<string, Pool>>;
}

export const useRouteAssets = (): RouteAssets => {

  const { data: assets } = useGetAssetsQuery(undefined, {
    pollingInterval: 1000 * 60 * 10,
  });
  const { data: pools } = useGetPoolsQuery(undefined, {
    pollingInterval: 1000 * 60 * 10,
  });

  const [searchParams] = useSearchParams();
  let t0 = searchParams.get("t0");
  let t1 = searchParams.get("t1");

  if (t0 === t1 || !t0 || !t1) {
    t0 = TON_ADDRESS;
    t1 = TEGRO_ADDRESS;
  }

  const [token0Address, setToken0Address] = useState(t0 || TON_ADDRESS);
  const [token1Address, setToken1Address] = useState(t1 || TEGRO_ADDRESS);

  const [token0Amount, setToken0Amount] = useState(0);
  const [token1Amount, setToken1Amount] = useState(0);

  const { token0Balance, token1Balance } = usePairBalances({
    token0Address,
    token1Address,
  });

  const poolByAssetsAddressesHashMap = new Map<string, Map<string, Pool>>();
  for (const pool of pools || []) {
    if (!poolByAssetsAddressesHashMap.has(pool.token0_address)) {
      poolByAssetsAddressesHashMap.set(pool.token0_address, new Map());
    }
    if (!poolByAssetsAddressesHashMap.has(pool.token1_address)) {
      poolByAssetsAddressesHashMap.set(pool.token1_address, new Map());
    }
    poolByAssetsAddressesHashMap
      .get(pool.token0_address)
      ?.set(pool.token1_address, pool);
    poolByAssetsAddressesHashMap
      .get(pool.token1_address)
      ?.set(pool.token0_address, pool);
  }

  useEffect(() => {
    t0 = token0Address;
    t1 = token1Address;
    const url = new URL(window.location.toString());
    url.searchParams.set("t0", t0 || TON_ADDRESS);
    url.searchParams.set("t1", t1 || TEGRO_ADDRESS);
    window.history.pushState({}, "", url);
  }, [token0Address, token1Address]);

  return {
    token0Address,
    setToken0Address,
    token1Address,
    setToken1Address,
    token0Balance,
    token1Balance,
    token0Amount,
    setToken0Amount,
    token1Amount,
    setToken1Amount,
    assets,
    pools,
    poolByAssetsAddressesHashMap,
  };
};
