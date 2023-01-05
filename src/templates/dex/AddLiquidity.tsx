import {useNavigate} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Coins} from 'ton3-core';
import {NavComponent} from './components/Nav';
import {DexContext, DexContextType} from '../../context';
import {PairData} from '../../types';
import {Token} from '../../ton/dex/api/types';
import {fieldNormalizer} from '../../utils';

export default function AddLiquidityPage() {
    const navigate = useNavigate();
    const go_back = () => navigate(-1);

    const {
        poolPair,
        poolParams,
        updatePoolParams,
        walletInfo,
        tokens,
    } = useContext(DexContext) as DexContextType;

    let {
        slippage,
        inAmount,
        outAmount
    } = poolParams;
    const {
        leftWallet,
        rightWallet,
        leftReserved,
        rightReserved,
        rightBalance,
        leftBalance,
        leftToken,
        rightToken,
    } = poolPair as PairData;

    const tonBalance = walletInfo?.balance ?? new Coins(0);

    const [share, setShare] = useState(0);

    const from = tokens?.find((t) => t.address.eq(leftToken)) as Token;

    const to = tokens?.find((t) => t.address.eq(rightToken)) as Token;
    const leftPrice = leftReserved.isZero()
        ? new Coins(0)
        : new Coins(rightReserved).div(leftReserved.toString());
    const rightPrice = rightReserved.isZero()
        ? new Coins(0)
        : new Coins(leftReserved).div(rightReserved.toString());

    const {
        register,
        setValue,
        getValues,
        formState: {isValid},
    } = useForm({mode: 'onChange'});

    const [lastSide, setLastSide] = useState<('left' | 'right')>('left');

    const updateAmount = (side: ('left' | 'right')) => {
        setLastSide(side);
        const value = getValues(side) ?? 0;
        console.log('val', value);
        if (value) {
            inAmount = new Coins(value);

            // getStakeAmount(inAmount, lReserve, rReserve);
            if (side === 'left') {
                outAmount = new Coins(inAmount).div(rightPrice.toString());
                setShare(Number(new Coins(inAmount).div(Number(new Coins(leftReserved).add(inAmount).toString())).toString()))
                updatePoolParams({
                    ...poolParams,
                    inAmount,
                    outAmount
                });
                setValue('right', outAmount.toString());
            } else {
                outAmount = new Coins(inAmount).div(leftPrice.toString());
                setShare(Number(new Coins(inAmount).div(Number(new Coins(rightReserved).add(inAmount).toString())).toString()))
                updatePoolParams({
                    ...poolParams,
                    outAmount: inAmount,
                    inAmount: outAmount
                });
                setValue('left', outAmount.toString());
            }
        } else {
            inAmount = new Coins(0);
            outAmount = new Coins(0);
            setShare(0);
            updatePoolParams({
                ...poolParams,
                inAmount,
                outAmount,
            });
            setValue('right', outAmount.toString());
            setValue('left', outAmount.toString());
        }
    };

    useEffect(() => updateAmount(lastSide), [leftReserved, rightReserved]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-7 col-xl-5 mx-auto">
                    <NavComponent/>
                    <div className="card rounded shadow border-0">
                        <form className="card-body p-40" action="">
                            <div className="d-flex align-items-center mb-4">
                                <h2 className="card-title fs-24 fw-700 me-auto">
                                    <a onClick={go_back} className="me-3">
                                        <i className="fa-regular fa-arrow-left"/>
                                    </a>
                                    Add Liquidity
                                </h2>
                                {/* <a href="#!" data-bs-toggle="modal" data-bs-target="#SettingsModal"> */}
                                {/*     <i className="fa-regular fa-gear fa-lg" /> */}
                                {/* </a> */}
                            </div>

                            <div className="d-flex justify-content-between mb-3 px-2">
                                <label htmlFor=""/>
                                <div className="fw-500 color-grey">
                                    Balance:
                                    {' '}
                                    <span>{`${(leftBalance ?? tonBalance).toString()} ${from.symbol}`}</span>
                                </div>
                            </div>
                            <div className="input-group mb-4">
                                <input
                                    className="form-control fw-500 fs-18 px-3"
                                    placeholder="0"
                                    type="text"
                                    inputMode="decimal"
                                    aria-invalid="false"
                                    {...register('left', {
                                        onChange: (event) => {
                                            fieldNormalizer('left', event.target.value, setValue);
                                            updateAmount('left');
                                        },
                                        validate: (value) => value && parseFloat(value) > 0,
                                    })}
                                />
                                <div className="input-group-text p-1">
                                    <a
                                        className="btn btn-sm bg-soft-blue rounded-8 d-flex align-items-center justify-content-center px-4"
                                        style={{minWidth: '164px'}}
                                        href="#!"
                                        data-bs-toggle="modal"
                                        data-bs-target="#TokenModalLeft"
                                    >
                                        <img
                                            src={from.image}
                                            width="24"
                                            height="24"
                                            alt={from.name}
                                        />
                                        <span
                                            className="mx-3 fw-500 text-uppercase"
                                        >
                                            {from.symbol}
                                        </span>
                                        <i className="fa-solid fa-ellipsis-vertical"/>
                                    </a>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mb-3 px-2">
                                <label htmlFor="">+</label>
                                <div className="fw-500 color-grey">
                                    {'Balance: '}
                                    <span>{`${(rightBalance ?? tonBalance).toString()} ${to.symbol}`}</span>
                                </div>
                            </div>
                            <div className="input-group mb-4">
                                <input
                                    className="form-control fw-500 fs-18 px-3"
                                    placeholder="0"
                                    defaultValue={outAmount.toString()}
                                    // disabled
                                    {...register('right', {
                                        onChange: (event) => {
                                            fieldNormalizer('right', event.target.value, setValue);
                                            updateAmount('right');
                                        },
                                        validate: (value) => value && parseFloat(value) > 0,
                                    })}
                                />
                                <div className="input-group-text p-1">
                                    <a
                                        className="btn btn-sm bg-soft-blue rounded-8 d-flex align-items-center justify-content-center px-4"
                                        style={{minWidth: '164px'}}
                                        href="#!"
                                        data-bs-toggle="modal"
                                        data-bs-target="#TokenModalRight"
                                    >
                                        <img
                                            src={to.image}
                                            width="24"
                                            height="24"
                                            alt={to.name}
                                        />
                                        <span
                                            className="mx-3 fw-500 text-uppercase"
                                        >
                                            {to.symbol}
                                        </span>
                                        <i className="fa-solid fa-ellipsis-vertical"/>
                                    </a>
                                </div>
                            </div>

                            <div className="card-alert p-4 bg-soft-blue rounded-8">
                                <ul className="list-unstyled">
                                    <li className="list-item d-flex mb-4">
                                        <span className="me-auto fw-500">{`${from.symbol} per ${to.symbol}`}</span>
                                        <span
                                            className="text-muted"
                                        >
                                            {rightPrice.toString()}
                                        </span>
                                    </li>
                                    <li className="list-item d-flex mb-4">
                                        <span className="me-auto fw-500">{`${to.symbol} per ${from.symbol}`}</span>
                                        <span
                                            className="text-muted"
                                        >
                                            {leftPrice.toString()}
                                        </span>
                                    </li>
                                    <li className="list-item d-flex">
                                        <span className="me-auto fw-500">Share of Pool</span>
                                        <span
                                            className="text-muted"
                                        >
                                            {`${(share * 100).toFixed(2)}%`}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center mt-40 d-flex justify-content-center">
                                {isValid ? (
                                    (((leftBalance && leftBalance.gte(inAmount)) || (!leftBalance && tonBalance.gte(inAmount)))
                                        && ((rightBalance && rightBalance.gte(outAmount)) || (!rightBalance && tonBalance.gte(outAmount))))
                                        ? (
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#ConfirmStake"
                                            >
                                                Suggest
                                            </button>
                                        ) : (
                                            <button type="button" className="btn btn-outline-primary"
                                                    style={{cursor: 'not-allowed'}}>
                                                {`Insufficient ${from.symbol} or ${to.symbol} balance`}
                                            </button>
                                        )
                                ) : (
                                    <button type="button" className="btn btn-outline-primary"
                                            style={{cursor: 'not-allowed'}}>
                                        Enter an amount
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                    <div
                        className="alert alert-dismissible bg-white rounded shadow border-0 fade show mt-40 p-4"
                        role="alert"
                    >
                        <div className="d-flex">
                            <i className="fa-regular fa-circle-info fa-2x color-red mt-1"/>
                            <p className="ms-3 mb-0 pe-3 text-muted">
                                By adding liquidity you&apos;ll earn 0.25% of all trades on this
                                pair
                                proportional to your share of the pool. Fees are added to the pool,
                                accrue in real time and can be claimed by withdrawing
                                your liquidity.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
