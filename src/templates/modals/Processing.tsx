import {useContext} from 'react';
import {QRCode} from 'react-qrcode-logo';
import {DexContext, DexContextType} from '../../context';

export function ProcessingModal() {
    const {walletInfo} = useContext(DexContext) as DexContextType;
    // const { swapInfo: { pair: { right } } } = dexInfo;
    // const symbol = right ? right.jetton.meta.symbol : 'TON';

    return (
        <div className="modal fade" id="ProcessingModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered mobile-modal-bottom">
                <div className="modal-content border-0 rounded p-40">
                    <div className="modal-body text-center py-5">
                        <i className="fa-regular fa-server fa-3x mb-4 color-blue"/>
                        <h2 className="card-title fs-24 fw-700 mb-3 position-relative">
                            Processing
                            <span className="dots ms-1 mt-1">
                                <span className="dot-one">.</span>
                                <span className="dot-two">.</span>
                                <span className="dot-three">.</span>
                            </span>
                        </h2>
                        <p>
                            {walletInfo?.approveLink !== ''
                                ? (
                                    <QRCode
                                        value={walletInfo?.approveLink}
                                        size={256}
                                        quietZone={0}
                                        ecLevel="L"
                                        removeQrCodeBehindLogo
                                        eyeRadius={10}
                                        bgColor="#121418"
                                        fgColor="#fff"
                                    />
                                )
                                : null}
                        </p>
                        {/* <p className="text-muted mb-0"> */}
                        {/*    {`Your ${symbol} will be credited to your account `} */}
                        {/*    <br /> */}
                        {/*    after this transaction has been processed. */}
                        {/* </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
