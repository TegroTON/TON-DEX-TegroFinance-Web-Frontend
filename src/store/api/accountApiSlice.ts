import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../store";
import { AccountData, GetAccountDataResponse } from "./accountApiTypes";
import { Address } from "ton3-core";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${BACKEND_URL}/api/v1/account/`;

export const accountApiV1 = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAccountData: builder.query<AccountData, void>({
      query: () => `get_data`,
      transformResponse: (response: GetAccountDataResponse) => {
        return {
          affiliate: response.affiliate_address
            ? new Address(response.affiliate_address)
            : undefined,
          referrals: response.referrals_addresses.map(
            (address) => new Address(address)
          ),
        };
      },
    }),
  }),
});

export const { useGetAccountDataQuery } = accountApiV1;
