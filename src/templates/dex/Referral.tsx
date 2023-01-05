import {NavComponent} from "./components/Nav";

export function ReferralPage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-7 col-xl-5 mx-auto">
                    <NavComponent/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 col-xl-8 mx-auto">
                    <div className="card card rounded shadow border-0 mb-4">
                        <div className="card-body p-40">
                            <div className="mb-40">
                                <h2 className="card-title fs-24 fw-700 me-auto mb-2">Dashboard</h2>
                                <p className="mb-0 text-muted">Invite your friends. Earn
                                    cryptocurrency together</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <div
                                        className="card-alert d-flex align-items-center p-4 bg-soft-blue rounded-8">
                                        <div className="me-auto">
                                            <div className="text-muted">
                                                Active friends / Total Friends
                                            </div>
                                            <div className="fs-24 fw-700">3/8</div>
                                        </div>
                                        <div
                                            className="bg-soft-blue rounded-circle color-blue d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "48px",
                                                height: "48px"
                                            }}>
                                            <i className="fa-light fa-users fs-24"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div
                                        className="card-alert d-flex align-items-center p-4 bg-soft-blue rounded-8">
                                        <div className="me-auto">
                                            <div className="text-muted">Total earned</div>
                                            <div className="fs-24 fw-700">124 TGR</div>
                                        </div>
                                        <img src="/images/tgr.png" width="48" height="48"
                                             alt="Ton Coin"/>
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-4">
                                    <div className="d-flex align-items-center px-4 mb-4">
                                        <span className="fw-500 me-auto">Total swap friends:</span>
                                        <span className="text-muted">0</span>
                                    </div>
                                    <div className="d-flex align-items-center px-4 mb-4">
                                        <span className="fw-500 me-auto">Total swap earned:</span>
                                        <span className="text-muted">0</span>
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-4">
                                    <div className="d-flex align-items-center px-4 mb-4">
                                        <span className="fw-500 me-auto">Total Farms friends:</span>
                                        <span className="text-muted">0</span>
                                    </div>
                                    <div className="d-flex align-items-center px-4 mb-4">
                                        <span className="fw-500 me-auto">Total Farms earned:</span>
                                        <span className="text-muted">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card rounded shadow border-0">
                        <div className="card-body p-0">
                            <div className="p-40">
                                <h2 className="card-title fs-24 fw-700 me-auto mb-2">Referral
                                    List</h2>
                                <p className="mb-0 text-muted">All your referral friends in one
                                    place</p>
                            </div>
                            <div className="table-responsive">
                                <table className="table" style={{minWidth: "776px"}}>
                                    <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Wallet Address</th>
                                        <th scope="col">Trading Value</th>
                                        <th scope="col">Farms Liquidity</th>
                                        <th scope="col">Staked in Launchpiils</th>
                                        <th scope="col">Total earned</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th className="text-center" scope="row">04/28/22</th>
                                        <td className="text-center"><span>0x6e...0a62</span></td>
                                        <td className="text-center">-</td>
                                        <td className="text-center">$0.0000</td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                    </tr>
                                    <tr>
                                        <th className="text-center" scope="row">04/28/22</th>
                                        <td className="text-center"><span>0x6e...0a62</span></td>
                                        <td className="text-center">-</td>
                                        <td className="text-center">$0.0000</td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                    </tr>
                                    <tr>
                                        <th className="text-center" scope="row">04/28/22</th>
                                        <td className="text-center"><span>0x6e...0a62</span></td>
                                        <td className="text-center">-</td>
                                        <td className="text-center">$0.0000</td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                    </tr>
                                    <tr>
                                        <th className="text-center" scope="row">04/28/22</th>
                                        <td className="text-center"><span>0x6e...0a62</span></td>
                                        <td className="text-center">-</td>
                                        <td className="text-center">$0.0000</td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                    </tr>
                                    <tr>
                                        <th className="text-center" scope="row">04/28/22</th>
                                        <td className="text-center"><span>0x6e...0a62</span></td>
                                        <td className="text-center">-</td>
                                        <td className="text-center">$0.0000</td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                        <td><span className="d-block">0.0000 TGR</span><span
                                            className="text-muted fw-500">$0.0000</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
