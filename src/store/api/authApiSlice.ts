import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthGetPayloadResponse,
  AuthLoginRequest,
  TokenResponse,
} from "./authApiTypes";
import { ConnectAdditionalRequest } from "@tonconnect/ui-react";
import type { RootState } from "../store";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${BACKEND_URL}/api/v1/auth/`;

export const authApiV1 = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getPayload: builder.mutation<ConnectAdditionalRequest, void>({
      query: () => `get_payload`,
      transformResponse: (response: AuthGetPayloadResponse) => {
        return {
          tonProof: response.payload,
        };
      },
    }),
    login: builder.mutation<TokenResponse, AuthLoginRequest>({
      query(data) {
        return {
          url: "auth_with_ton_proof",
          method: "POST",
          body: data,
        };
      },
    }),
    refreshToken: builder.mutation<TokenResponse, void>({
      query() {
        return {
          url: "refresh_token",
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useGetPayloadMutation,
  useLoginMutation,
  useRefreshTokenMutation,
} = authApiV1;
