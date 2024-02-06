import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ErrorResponse } from "./common";
import {
  Asset,
  CompleteProvideLiquidityRequest,
  CompleteProvideLiquidityActivateRequest,
  GetBalancesResponse,
  Pool,
  ProvideLiquidityRequest,
  RemoveLiquidityRequest,
  SimulateAddLiquidityRequest,
  SimulateAddLiquidityResponse,
  SwapRequest,
  SwapSimulateRequest,
  SwapSimulateResponse,
  TransactionData,
} from "./dexApiTypes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const dexApiV1 = createApi({
  reducerPath: "dexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/v1`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAssets: builder.query<{ [key: string]: Asset }, void>({
      query: () => "/assets",
      transformResponse: (response: Asset[]) => {
        return response.reduce((acc: { [key: string]: Asset }, asset) => {
          return {
            ...acc,
            [asset.contract_address]: asset,
          };
        }, {});
      },
    }),

    getWalletPools: builder.query<Pool[], string>({
      query: (wallet_address) => `/wallet/${wallet_address}/get_pools`,
    }),

    getPools: builder.query<Pool[], void>({
      query: () => "/pools",
    }),

    simulateSwap: builder.query<
      SwapSimulateResponse | ErrorResponse,
      SwapSimulateRequest
    >({
      query: ({
        swapAction,
        offer_address,
        ask_address,
        units,
        slippage_tolerance,
        referral_address = null,
      }) => ({
        url:
          swapAction == "offer" ? "/swap/simulate" : "/reverse_swap/simulate",
        method: "POST",
        body: {
          offer_address,
          ask_address,
          units,
          slippage_tolerance,
          referral_address,
        },
      }),
    }),

    swap: builder.query<TransactionData, SwapRequest>({
      query: ({
        userWalletAddress,
        offerJettonAddress,
        offerAmount,
        askJettonAddress,
        minAskAmount,
      }) => ({
        url: "/swap",
        method: "POST",
        body: {
          userWalletAddress,
          offerJettonAddress,
          offerAmount,
          askJettonAddress,
          minAskAmount,
        },
      }),
    }),

    getBalances: builder.query<{ [key: string]: number }, string>({
      query: (wallet_address) => ({
        url: `/wallet/${wallet_address}/get_balances`,
        method: "GET",
      }),
      transformResponse: (response: GetBalancesResponse) => {
        return response.balances;
      },
    }),

    simulateAddLiquidity: builder.query<
      SimulateAddLiquidityResponse,
      SimulateAddLiquidityRequest
    >({
      query: ({
        token0_address,
        token0_amount,
        token1_address,
        token1_amount,
        slippage_tolerance,
        user_wallet_address,
        lp_account_address,
      }) => ({
        url: "/dex/liquidity/provide/simulate",
        method: "POST",
        body: {
          token0_address,
          token0_amount,
          token1_address,
          token1_amount,
          slippage_tolerance,
          user_wallet_address:
            user_wallet_address !== "" ? user_wallet_address : null,
          lp_account_address,
        },
      }),
    }),

    provideLiquidity: builder.query<TransactionData, ProvideLiquidityRequest>({
      query: ({
        user_wallet_address,
        token0_address,
        token1_address,
        token0_amount,
        token1_amount,
        min_lp_out,
      }) => ({
        url: "/dex/liquidity/provide",
        method: "POST",
        body: {
          user_wallet_address,
          token0_address,
          token1_address,
          token0_amount,
          token1_amount,
          min_lp_out,
        },
      }),
    }),

    completeProvideLiquidity: builder.query<
      TransactionData,
      CompleteProvideLiquidityRequest
    >({
      query: ({
        user_wallet_address,
        token_address,
        second_token_address,
        token_amount,
        min_lp_out,
      }) => ({
        url: "/dex/liquidity/provide_complete",
        method: "POST",
        body: {
          user_wallet_address,
          token_address,
          second_token_address,
          token_amount,
          min_lp_out,
        },
      }),
    }),

    completeProvideLiquidityActivate: builder.query<
      TransactionData,
      CompleteProvideLiquidityActivateRequest
    >({
      query: ({
        token0_amount,
        token1_amount,
        min_lp_out,
        lp_account_address,
      }) => ({
        url: "/dex/liquidity/provide_complete_activate",
        method: "POST",
        body: {
          token0_amount,
          token1_amount,
          min_lp_out,
          lp_account_address,
        },
      }),
    }),

    removeLiquidity: builder.query<TransactionData, RemoveLiquidityRequest>({
      query: ({
        user_wallet_address,
        token0_address,
        token1_address,
        lp_tokens_amount,
      }) => ({
        url: "/dex/liquidity/remove",
        method: "POST",
        body: {
          user_wallet_address,
          token0_address,
          token1_address,
          lp_tokens_amount,
        },
      }),
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetWalletPoolsQuery,
  useGetPoolsQuery,
  useSimulateSwapQuery,
  useSwapQuery,
  useGetBalancesQuery,
  useSimulateAddLiquidityQuery,
  useProvideLiquidityQuery,
  useCompleteProvideLiquidityQuery,
  useCompleteProvideLiquidityActivateQuery,
  useRemoveLiquidityQuery,
} = dexApiV1;
