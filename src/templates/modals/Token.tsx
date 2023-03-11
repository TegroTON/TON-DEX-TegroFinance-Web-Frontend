import { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { DexContext, DexContextType } from '../../context';
import { Modal, Form, InputGroup, ListGroup } from 'react-bootstrap';
import {useLocation} from "react-router";
import {addrToStr, getPairByTokens} from "../../ton/dex/utils";
import {Address} from "ton3-core";

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
                updatePoolPair({newPair: getPairByTokens(pairs, null, tokenAddress)});
            }
        } else {
            updateSwap({side: normSide, address: tokenAddress})
        }
    };

    return (
        <div className="modal fade" id={`TokenModal${side}`} tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered mobile-modal-bottom">
                <div className="modal-content p-4">
                    <Modal.Header className="border-0 mb-4 p-0">
                        <Modal.Title>Select a token</Modal.Title>
                        <button type="button" className="btn border-0 p-0" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark fa-lg"></i></button>
                    </Modal.Header>
                    <Modal.Body className="p-0">
                        <Form>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="text-muted px-3">
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
                            <div className="token-form__btns row mb-4" style={{ margin: "0 -4px" }}>
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
                            </div>
                            <h4 className="token-form__title fs-16 mb-4">Token Name</h4>
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
                                            className="d-flex align-items-center hover rounded-8 p-3"
                                            data-bs-dismiss="modal"
                                            key={token.symbol}
                                        >
                                            <input type="checkbox"
                                                style={{ display: 'none' }}
                                                {...register(addrToStr(token.address) || "TON", {
                                                    onChange: (event) => changeSelected(event.target.name),
                                                })}
                                            />
                                            <img className="token-form__img rounded-circle" src={token.image} width="24px" height="24px" alt={token.symbol} />
                                            <span className="token-form__symbol fw-500 ms-3">{token.symbol}</span>
                                            <span className="token-form__name text-muted ms-auto">{token.name}</span>
                                        </Form.Label>
                                    );
                                })}
                            </div>
                        </Form>
                    </Modal.Body>
                </div>
            </div>
        </div>
    );
}
