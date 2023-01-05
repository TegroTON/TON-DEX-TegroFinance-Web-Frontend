import {useContext} from 'react';
import {DexContext, DexContextType} from '../../context';

export function SettingsModal() {
    const {
        swapParams,
        updateSlippage,
    } = useContext(DexContext) as DexContextType;
    const {slippage} = swapParams;

    return (
        <div className="modal fade" id="SettingsModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered mobile-modal-bottom">
                <div className="modal-content border-0 rounded p-40">
                    <div className="modal-header border-0 p-0 mb-40">
                        <h5 className="modal-title" id="ConnectModalLabel">Settings</h5>
                        <button
                            type="button"
                            className="btn p-0"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <i className="fa-solid fa-xmark fa-lg"/>
                        </button>
                    </div>
                    <div className="modal-body p-0">
                        <h4 className="fs-500 fs-18 text-muted mb-4">
                            Slippage tolerance
                            <a href="#!" className="text-muted ms-2 tooltips">
                                <i className="fa-regular fa-circle-question color-blue small"/>
                                <span>Your transaction will revert it the price changes unfavorably by more than this percentage.</span>
                            </a>
                        </h4>
                        <div className="row align-items-center">
                            <div className="col-6 col-lg-3 mb-2 mb-lg-0">
                                <a
                                    style={{cursor: 'pointer'}}
                                    onClick={() => updateSlippage(0.1)}
                                    className={`btn d-block ${slippage === 0.1 ? 'btn-primary' : 'bg-soft-blue'}`}
                                >
                                    0,1%
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 mb-2 mb-lg-0">
                                <a
                                    style={{cursor: 'pointer'}}
                                    onClick={() => updateSlippage(0.5)}
                                    className={`btn d-block ${slippage === 0.5 ? 'btn-primary' : 'bg-soft-blue'}`}
                                >
                                    0,5%
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 mb-2 mb-lg-0">
                                <a
                                    style={{cursor: 'pointer'}}
                                    onClick={() => updateSlippage(1)}
                                    className={`btn d-block ${slippage === 1 ? 'btn-primary' : 'bg-soft-blue'}`}
                                >
                                    1%
                                </a>
                            </div>
                            <div className="col-6 col-lg-3 mb-2 mb-md-0">
                                <div className="input-group" style={{height: '50px'}}>
                                    <input
                                        type="number"
                                        className="form-control"
                                        defaultValue={slippage}
                                        min={0.1}
                                        max={99.9}
                                        step={0.1}
                                        style={[0.1, 0.5, 1].includes(slippage) ? {minHeight: '50px'} : {
                                            minHeight: '50px',
                                            backgroundColor: '#0d6efd',
                                            color: '#fff',
                                            borderColor: '#0d6efd',
                                        }}
                                        onChange={(event) => updateSlippage(parseFloat(event.target.value))}
                                        required={![0.1, 0.5, 1].includes(slippage)}
                                        placeholder="3%"
                                    />
                                    {/* <span className="input-group-text text-muted" */}
                                    {/*       style={{height: "50px"}}><i */}
                                    {/*     className="fa-solid fa-percent"></i></span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
