import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "typeface-inter";
import { ScrollToTop } from './ScrollToTop';
import { DexContextProvider } from './context';
import { DeLabContextProvider } from './deLabContext';
import { RecoilRoot } from 'recoil';
    // import '../public/assets/css/app.min.css';

// console.log('test');
// walletService.registerAdapter('ton-wallet', new TonWalletWalletAdapter(tonClient, new TonWalletClient(window)));
// walletService.registerAdapter('tonhub', new TonhubWalletAdapter(new TonhubConnector({network: 'sandbox'})));

ReactDOM.createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <RecoilRoot>
                <DeLabContextProvider>
                    <DexContextProvider>
                        {/* <MemoryRouter> */}
                        <BrowserRouter>
                            <ScrollToTop>
                                <App />
                            </ScrollToTop>
                        </BrowserRouter>
                        {/* </MemoryRouter> */}
                    </DexContextProvider>
                </DeLabContextProvider>
            </RecoilRoot>
        </React.StrictMode>,
    );
