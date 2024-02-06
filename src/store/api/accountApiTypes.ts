import { Address } from "ton3-core";

export interface GetAccountDataResponse {
  affiliate_address?: string;
  referrals_addresses: string[];
}

export interface AccountData {
  affiliate?: Address;
  referrals: Address[];
}
