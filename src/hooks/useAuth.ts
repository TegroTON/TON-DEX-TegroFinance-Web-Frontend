import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  useGetPayloadMutation,
  useLoginMutation,
} from "../store/api/authApiSlice";
import { removeToken, updateToken } from "../store/features/authSlice";
import { getCookie } from "../utils/cookie";

const TokenCookieKey = import.meta.env.VITE_LOCAL_TOKEN_COOKIE_KEY ?? "";
const REFERRAL_LINK_KEY = "ref";

const getTokenCookie = () => {
  const token = getCookie(TokenCookieKey);
  return token;
};

export function useAuth() {
  const dispatch = useDispatch();

  const [getPayloadRequest] = useGetPayloadMutation();
  const [loginRequest] = useLoginMutation();

  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const refreshPayloadInterval = useRef<
    ReturnType<typeof setInterval> | undefined
  >();
  const checkTokenCookieInterval = useRef<
    ReturnType<typeof setInterval> | undefined
  >();

  const refreshPayload = async () => {
    tonConnectUI.setConnectRequestParameters({ state: "loading" });

    const value = await getPayloadRequest().unwrap();
    if (!value) {
      tonConnectUI.setConnectRequestParameters({
        state: "loading",
      });
    } else {
      tonConnectUI.setConnectRequestParameters({
        state: "ready",
        value,
      });
    }
  };

  const removeTokenCookie = () => {
    dispatch(removeToken());
    document.cookie = `${TokenCookieKey}=; max-age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    if (tonConnectUI.connected) {
      tonConnectUI.disconnect();
    }
  };

  const checkTokenCookie = () => {
    const newToken = getTokenCookie();
    if (newToken) {
      dispatch(updateToken(newToken));
    } else if (tonConnectUI.connected) {
      removeTokenCookie();
    }
  };

  if (!checkTokenCookieInterval.current) {
    checkTokenCookieInterval.current = setInterval(checkTokenCookie, 1000 * 5);
  }

  useEffect(() => {
    const cookieToken = getTokenCookie();

    if (cookieToken) {
      dispatch(updateToken(cookieToken));
    }

    if (!isConnectionRestored) {
      return;
    }

    if (!wallet) {
      console.log("Hello error")
      removeTokenCookie();

      refreshPayload();
      refreshPayloadInterval.current = setInterval(
        refreshPayload,
        1000 * 60 * 19
      );
      return;
    }

    if (cookieToken) {
      return;
    }

    if (
      wallet.connectItems?.tonProof &&
      !("error" in wallet.connectItems.tonProof)
    ) {
      loginRequest({
        referral_code: localStorage.getItem(REFERRAL_LINK_KEY) ?? undefined,
        address: wallet.account.address,
        network: Number(wallet.account.chain),
        proof: {
          timestamp: wallet.connectItems.tonProof.proof.timestamp,
          domain: {
            length_bytes: wallet.connectItems.tonProof.proof.domain.lengthBytes,
            value: wallet.connectItems.tonProof.proof.domain.value,
          },
          signature: wallet.connectItems.tonProof.proof.signature,
          payload: wallet.connectItems.tonProof.proof.payload,
          state_init: wallet.account?.walletStateInit,
          public_key: wallet.account?.publicKey,
        },
      })
        .unwrap()
        .then(() => {
          checkTokenCookie();
        });
    } else {
      removeTokenCookie();
      tonConnectUI.disconnect();
    }
  }, [wallet, isConnectionRestored]);
}
