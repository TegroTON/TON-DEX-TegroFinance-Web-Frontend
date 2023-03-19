import { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { DexContext, DexContextType } from '../../context';
import { Modal, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { useLocation } from "react-router";
import { addrToStr, getPairByTokens } from "../../ton/dex/utils";
import { Address } from "ton3-core";

export function TokenModal(props: { side: 'Left' | 'Right' }) {
    const { side } = props;

    const {
        walletInfo,
        swapPairs,
        swapLeft,
        swapRight,
        tokens,
        pairs,
        updateSwap,
        updatePoolPair
    } = useContext(DexContext) as DexContextType;

    const location = useLocation();

    // console.log(location.pathname);

    const normSide = side && side === 'Left' ? 'left' : 'right';

    const {
        register,
        watch,
    } = useForm({ mode: 'onChange' });

    const search = useRef('');
    search.current = watch('search', 'value');

    const changeSelected = async (tokenAddr: string) => {
        const tokenAddress = tokenAddr !== "TON" ? new Address(tokenAddr) : null;

        if (location.pathname === "/liquidity-add") {
            if (tokenAddress) {
                updatePoolPair({ newPair: getPairByTokens(pairs, null, tokenAddress) });
            }
        } else {
            updateSwap({ side: normSide, address: tokenAddress })
        }
    };

    return (
        <div className="modal fade mobile-modal-bottom" id={`TokenModal${side}`} tabIndex={-1} aria-hidden="true">
            <Modal.Dialog centered>
                <Modal.Header data-bs-dismiss="modal" aria-label="Close" closeButton>
                    <Modal.Title>Select a token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className="text-muted px-2">
                                <i className="fa-solid fa-magnifying-glass fa-lg" />
                            </InputGroup.Text>
                            <Form.Control
                                type="search"
                                className="form-control"
                                placeholder="Search name or paste address"
                                autoComplete="off"
                                {...register('search', {})}
                            />
                        </InputGroup>
                        {/* <div className="token-form__btns row mb-3" style={{ margin: "0 -4px" }}>
                            {tokens.slice(0, 3).map((token) => (
                                <Form.Label
                                    className="col-4 btn btn-light flex-fill px-3 py-2 m-1"
                                    style={{ width: "120px" }}
                                    data-bs-dismiss="modal"
                                >
                                    <input
                                        type="checkbox"
                                        style={{ display: "none" }}
                                        {...register(addrToStr(token.address) || "TON", {
                                            onChange: (event) => changeSelected(event.target.name),
                                        })}
                                    />
                                    <img className="token-form__img rounded-circle"
                                        src={token.image} width="24px" height="24px"
                                        alt={token.symbol}
                                    />
                                    <span className="ms-2 fs-12">{token.symbol}</span>
                                </Form.Label>
                            ))}
                        </div> */}
                        <div className="token-form__list overflow-auto"
                            style={{ maxHeight: '408px' }}
                        >
                            {tokens.map((token) => {
                                if (!(token.name?.toLowerCase()
                                    .includes(search.current.toLowerCase()))
                                    && !(token.symbol.toLowerCase()
                                        .includes(search.current.toLowerCase()))) {
                                    return '';
                                }
                                return (
                                    <Form.Label
                                        className="d-flex align-items-center hover rounded-8 px-2 py-3"
                                        data-bs-dismiss="modal"
                                        key={token.symbol}
                                    >
                                        <input type="checkbox"
                                            style={{ display: 'none' }}
                                            {...register(addrToStr(token.address) || "TON", {
                                                onChange: (event) => changeSelected(event.target.name),
                                            })}
                                        />
                                        <img className="token-form__img rounded-circle" src={token.image} width={40} height={40} alt={token.symbol} />
                                        <div className="ms-3 me-auto">
                                            <div className="token-form__symbol fw-500">{token.symbol}</div>
                                            <div className="token-form__name fs-12 color-grey">{token.name}</div>
                                        </div>
                                        <i className="fa-solid fa-angle-right me-2 color-grey" />
                                        {/* <div className="token-form__name fs-12 fw-500 color-grey">0.23 {token.symbol}</div> */}
                                    </Form.Label>
                                );
                            })}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}
