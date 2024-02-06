export interface AuthGetPayloadResponse {
  payload: string;
}

export interface AuthLoginRequest {
  referral_code?: string;
  address: string;
  network: number;
  proof: {
    timestamp: number;
    domain: {
      length_bytes: number;
      value: string;
    };
    signature: string;
    payload: string;
    state_init?: string;
    public_key?: string;
  };
}

export interface TokenResponse {
  token: string;
}
