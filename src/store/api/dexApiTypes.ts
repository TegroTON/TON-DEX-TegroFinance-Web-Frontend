import { SwapAction } from "../../pages/dex/Swap";

export interface Asset {
  image_url: string;
  kind: string;
  symbol: string;
  decimals: number;
  display_name: string;
  contract_address: string;
}

export interface Pool {
  address: string;
  apy_1d: number;
  apy_30d: number;
  apy_7d: number;
  collected_token0_protocol_fee: number;
  collected_token1_protocol_fee: number;
  deprecated: string;
  lp_account_address: string;
  lp_balance?: number;
  lp_fee: number;
  lp_price_usd: number;
  lp_total_supply: number;
  lp_total_supply_usd: number;
  lp_wallet_address?: string;
  protocol_fee: number;
  protocol_fee_address: string;
  ref_fee: number;
  reserve0: number;
  reserve1: number;
  router_address: string;
  token0_address: string;
  token0_balance: number;
  token1_address: string;
  token1_balance: number;
}

export interface SwapSimulateRequest {
  swapAction: SwapAction;
  offer_address: string;
  ask_address: string;
  units: string;
  slippage_tolerance: number;
  referral_address?: string | null;
}

export interface SwapSimulateResponse {
  ask_address: string;
  ask_units: string;
  fee_address: string;
  fee_percent: string;
  fee_units: string;
  min_ask_units: string;
  offer_address: string;
  offer_units: string;
  pool_address: string;
  price_impact: number;
  router_address: string;
  slippage_tolerance: number;
  swap_rate: number;
  ton_fee_units: string;
}

export const isSwapSimulateResponse = (
  data: any
): data is SwapSimulateResponse => true;

export interface SwapRequest {
  userWalletAddress: string;
  offerJettonAddress: string;
  offerAmount: string;
  askJettonAddress: string;
  minAskAmount: string;
}

export interface MessageData {
  to: string;
  amount: string;
  payload?: string;
}

export interface TransactionData {
  valid_until: number;
  messages: MessageData[];
}

export interface GetBalancesResponse {
  balances: { [key: string]: number };
}

export interface SimulateAddLiquidityRequest {
  token0_address: string;
  token0_amount: string;
  token1_address: string;
  token1_amount: string;
  slippage_tolerance: number;
  user_wallet_address?: string;
  lp_account_address?: string;
}

export interface SimulateAddLiquidityResponse {
  token0_amount: number;
  token1_amount: number;
  expected_tokens: number;
  min_expected_tokens: number;
  estimated_share_of_pool: number;
  action:
    "provide"
    | "provide_second"
    | "provide_additional_amount"
    | "direct_add_provide";
  send_token_address?: string;
  send_amount?: number;
}

export interface ProvideLiquidityRequest {
  user_wallet_address: string;
  token0_address: string;
  token1_address: string;
  token0_amount: string;
  token1_amount: string;
  min_lp_out: string;
}

export interface CompleteProvideLiquidityRequest {
  user_wallet_address: string;
  token_address: string;
  second_token_address: string;
  token_amount: string;
  min_lp_out: string;
}

export interface CompleteProvideLiquidityActivateRequest {
  token0_amount: string;
  token1_amount: string;
  min_lp_out: string;
  lp_account_address: string;
}

export interface RemoveLiquidityRequest {
  user_wallet_address: string;
  token0_address: string;
  token1_address: string;
  lp_tokens_amount: string;
}
