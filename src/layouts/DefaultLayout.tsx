import { Outlet } from "react-router-dom";
import { DefaultFooter } from "../pages/footers";
import { DefaultHeader } from "../pages/headers";
import { useReferralLink } from "../hooks/useReferralLink";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

export default function DefaultLayout() {
  useReferralLink();
  useAuth();
  useTheme();

  return (
    <>
      <div className="wrapper">
        <DefaultHeader />
        <Outlet />
      </div>
      <DefaultFooter />
    </>
  );
}
