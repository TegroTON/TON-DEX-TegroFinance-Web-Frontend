import { Navigate, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import { AddLiquidityPage, LiquidityPage, SwapPage } from './templates/dex';
import { ReferralPage } from './templates/dex/Referral';
import { PrivacyPage } from './templates/dex/Privacy';
import { TermsPage } from './templates/dex/Terms';
import { TokensPage } from './templates/dex/Tokens';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                {/* <Route index element={<ComingSoonPage />} /> */}
                <Route index element={<Navigate to="/swap" replace />} />
                <Route path="swap" element={<SwapPage />} />
                <Route path="liquidity" element={<LiquidityPage />} />
                <Route path="liquidity-add" element={<AddLiquidityPage />} />
                <Route path="referral" element={<ReferralPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="tokens" element={<TokensPage />} />
                {/*<Route path="symboldetail" element={<SymbolDetailPage />} />*/}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
