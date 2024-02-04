import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "ton3-core";

export interface AccountState {
  affiliate?: Address;
  referrals: Address[];
}

const initialState: AccountState = {
  referrals: [],
};

export const AccountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {},
});

export const selectAffiliate = (state: AccountState) => state.affiliate;
export const selectReferrals = (state: AccountState) => state.referrals;
