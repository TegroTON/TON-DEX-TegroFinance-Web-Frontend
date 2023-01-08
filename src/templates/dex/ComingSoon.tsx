import { useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { connector } from '../../ton';
import { walletsListQuery } from '../../state/wallets-list';
import { useTonConenctWallet } from '../../hooks/useTonConnectWallet';

export default function ComingSoonPage() {
    const walletsList = useRecoilValueLoadable(walletsListQuery);
    const wallet = useTonConenctWallet();
    // console.log(wallet);
    const main = async () => {
        if (walletsList.contents.embeddedWallet) {
            connector.connect({ jsBridgeKey: walletsList.contents.embeddedWallet.jsBridgeKey });
            return;
        }

        const tonkeeperConnectionSource = {
            universalLink: walletsList.contents.walletsList[0].universalLink,
            bridgeUrl: walletsList.contents.walletsList[0].bridgeUrl,
        };

        const universalLink = connector.connect(tonkeeperConnectionSource);
        // console.log(universalLink);
    };

    useEffect(() => {
        // connector.restoreConnection();
        // connector.disconnect();
    }, []);

    return (
        <div className="container">
            <div className="row" style={{ minHeight: '70vh' }}>
                <div className="col-md-8 col-lg-4 m-auto text-center">
                    <div className="mb-4"><i className="fa-duotone fa-triangle-exclamation color-grey fa-6x" /></div>
                    <h3 className="h2 mb-4 fw-900">
                        <span className="d-block">Service temporarily unavailable</span>
                    </h3>
                    <p className="fw-500 color-grey mb-5">
                        Thanks for visiting, but it&apos;s not working yet.
                        <br />
                        Come back in a few hours, everything should be working!
                    </p>
                </div>
            </div>
        </div>
    );
}
