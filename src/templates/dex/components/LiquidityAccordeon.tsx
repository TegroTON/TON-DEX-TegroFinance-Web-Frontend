import { useContext } from 'react';
import { Address, Coins } from 'ton3-core';
import { DexContext, DexContextType } from '../../../context';
import { Token } from '../../../ton/dex/api/types';
import { Button } from 'react-bootstrap';

export function LiquidityAccordionComponent(
    {
        pair,
        lpBalance,
    }:
        { pair: Address, lpBalance: Coins },
) {
    const {
        pairs,
        tokens,
    } = useContext(DexContext) as DexContextType;
    const PAIR = pairs.find((p) => p.address.eq(pair));

    const {
        leftToken,
        rightToken,
        leftReserved,
        rightReserved,
        lpSupply,
    } = PAIR!;

    const share = new Coins(lpBalance).div(lpSupply.toString());

    const l = tokens?.find((t) => t.address.eq(leftToken)) as Token;

    const r = tokens?.find((t) => t.address.eq(rightToken)) as Token;

    const pos = {
        left: new Coins(leftReserved).mul(share.toString()),
        right: new Coins(rightReserved).mul(share.toString()),
    };

    return (
        <div className="accordion mb-4" id="accordionLiquidity">
            <div className="accordion-item py-4 collapsed" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                <div className="d-flex align-items-center">
                    <div className="accordion-item__images">
                        <img src={l.image} alt="Tether" className="wc-img" style={{ width: '40px', height: '40px', }} />
                        <img src={r.image} alt="TGR" className="accordion-item__images-small" />
                    </div>
                    <div className="ms-3">
                        <span className="fs-16 fw-700">{`${l.symbol} / ${r.symbol}`}</span>
                        <p className="mb-0 text-muted fs-12">{`${l.name} / ${r.name}`}</p>
                    </div>
                    <div className="ms-auto">
                        <span className="me-4 fw-500 text-muted" />
                        <i className="fa-solid fa-angle-right" />
                    </div>
                </div>
                <div id="collapse1" className="accordion-collapse mt-4 collapse" data-bs-parent="#accordionLiquidity">
                    <ul className="list-unstyled bg-light p-3 rounded-8">
                        <li className="list-item d-flex align-items-center mb-3">
                            <img src={l.image} alt="" className="wc-img" style={{ width: '14px', height: '14px', }} />
                            <span className="ms-2 me-auto fw-500"> {`${l.name} position:`}</span>
                            <span className="text-muted">{`${pos.left} ${l.symbol}`}</span>
                        </li>
                        <li className="list-item d-flex align-items-center mb-3">
                            <img src={r.image} alt="" className="wc-img" style={{ width: '14px', height: '14px', }} />
                            <span className="ms-2 me-auto fw-500">{`${r.name} position:`}</span>
                            <span className="text-muted">{`${pos.right} ${r.symbol}`}</span>
                        </li>
                        <li className="list-item d-flex">
                            <span className="me-auto color-blue fw-500">Share in the pool:</span>
                            <span className="color-red fw-500">
                                {`${Number(new Coins(share).mul(100)
                                    .toString())
                                    .toFixed(2)}%`}
                            </span>
                        </li>
                    </ul>
                    <div className="text-center mt-3">
                        <Button variant="btn btn-ms btn-outline-red" data-bs-toggle="modal" data-bs-target="#RemoveLiquidity">
                            <i className="fa-regular fa-trash-can me-2" />
                            Remove Liquidity
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
