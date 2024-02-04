import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const REFERRAL_LINK_KEY = "ref";

export const useReferralLink = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const referralLink = searchParams.get(REFERRAL_LINK_KEY);

    if (referralLink && referralLink !== "") {
      localStorage.setItem(REFERRAL_LINK_KEY, referralLink);
      searchParams.delete(REFERRAL_LINK_KEY);
      setSearchParams(searchParams);
    }
  }, []);
};
