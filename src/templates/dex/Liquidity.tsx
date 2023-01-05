import {Link} from 'react-router-dom';
import React, {useContext, useEffect} from 'react';
import {NavComponent} from './components/Nav';
import {LiquidityAccordionComponent} from './components/LiquidityAccordeon';
import {DexContext, DexContextType} from '../../context';
import {DeLabButtonLabel, DeLabConnector} from '../../deLabContext';

export default function LiquidityPage() {
    const {
        walletInfo,
        poolPositions,
        updatePoolPositions,
    } = useContext(DexContext) as DexContextType;

    const testFunc = async () => {
        // const adapter = walletService.getWalletAdapter(walletInfo?.adapterId as string)
        // const jettonWallet = new JettonWalletContract(new Address("EQBk6YkDhzU1V67Dt_RcFOfPkW2pYdd6LDGomVSSL1xGdgUF"))
        // const dexPair = new DexBetaPairContract(new Address("EQBpLTnl0mciLdS52V6-Eh7h5TX4ivz-jOzVQoXI9ibHy9_i"))
        // const payload = dexPair.createAddLiquidityRequest(new Coins(5000), new Coins(35000), new Address("EQBmO_7SDGd7WRZQ5UEx0f-pG1uheNRW8wKoOuxJf9bqW3OJ"), jettonWallet)
        // await adapter.requestTransfer(walletInfo?.session, jettonWallet.address.toString(), "50500000000", BOC.toBase64Standard(payload), 300000)
        // const res = await axios.get('http://localhost:8080/pairs')
        // console.log('а что тут у нас?', res.data);
    };

    useEffect(() => {
        // testFunc().then();
        updatePoolPositions();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-7 col-xl-5 mx-auto">
                    <NavComponent/>
                    <div className="card rounded shadow border-0">
                        <form className="card-body p-40" action="">
                            <div className="d-flex mb-40">
                                <div>
                                    <h2 className="card-title fs-24 fw-700 me-auto mb-2">
                                        Your Liquidity
                                    </h2>
                                    <p className="mb-0 text-muted">
                                        Remove liquidity to receive tokens back
                                    </p>
                                </div>
                            </div>
                            {poolPositions && poolPositions.length > 0 ? (
                                poolPositions.map(
                                    (pp) => (
                                        <LiquidityAccordionComponent
                                            pair={pp.pair}
                                            lpBalance={pp.lpBalance}
                                        />
                                    ),
                                )
                            ) : (
                                <div className="card-alert p-5 bg-soft-blue text-center rounded-8">
                                    <i className="fa-regular fa-cloud-arrow-down fa-3x mb-4 color-blue"/>
                                    <p className="text-muted mb-0">
                                        Your active liquidity positions
                                        <br/>
                                        will appear here.
                                    </p>
                                </div>
                            )}
                            {!walletInfo?.isConnected ? (
                                <div className="text-center mt-40">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => DeLabConnector.openModal()}
                                    >
                                        <DeLabButtonLabel/>
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-40 text-center">
                                    <Link to="/liquidity-add" className="btn btn-danger">
                                        Add Liquidity
                                    </Link>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
