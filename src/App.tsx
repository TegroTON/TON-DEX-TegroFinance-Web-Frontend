import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { DefaultLayout } from "./layouts";
import { AddLiquidityPage, LiquidityPage, SwapPage } from "./pages/dex";
import { PrivacyPage } from "./pages/dex/Privacy";
import { TermsPage } from "./pages/dex/Terms";

import "./i18n/config";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      { index: true, element: <Navigate to="/swap" replace /> },
      { path: "/swap", Component: SwapPage },
      { path: "/liquidity", Component: LiquidityPage },
      { path: "/liquidity/provide", Component: AddLiquidityPage },
      { path: "/privacy", Component: PrivacyPage },
      { path: "/terms", Component: TermsPage },
      { path: "*", element: <Navigate to="/" replace /> }    ,
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
