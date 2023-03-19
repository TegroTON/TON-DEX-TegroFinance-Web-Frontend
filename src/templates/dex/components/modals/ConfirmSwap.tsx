import React, { useContext, useState } from "react";
import { Address, BOC, Coins } from "ton3-core";
import { DexContext, DexContextType } from "../../../../context";
import { DexBetaPairContract } from "../../../../ton/dex/contracts/DexBetaPairContract";
import { tonClient } from "../../../../ton";
import { Token } from "../../../../ton/dex/api/types";
import { TON_ADDRESS } from "../../../../ton/dex/constants";
import { Modal, Button } from "react-bootstrap";
import { CoinsToDecimals, getOutAmount } from "../../../../ton/dex/utils";
import { ProcessingModal } from "./Processing";

export function ConfirmSwapModal(props: any) {
  const {
    walletInfo,
    swapLeft,
    swapRight,
    swapPairs,
    slippage,
    tokens,
    extract,
    swapWallets,
    referral,
  } = useContext(DexContext) as DexContextType;
  const { amount: inAmount, token: from } = swapLeft;
  const { amount: outAmount, token: to } = swapRight;

  const tonBalance = walletInfo ? walletInfo.balance : new Coins(0);
  let minReceived = new Coins(0, { decimals: swapRight.token.decimals });
  let maxSold = new Coins(0, { decimals: swapLeft.token.decimals });
  try {
    minReceived = new Coins(swapRight.amount, {
      decimals: swapRight.token.decimals,
    }).mul(1 - slippage / 100);
    maxSold = new Coins(swapLeft.amount, {
      decimals: swapLeft.token.decimals,
    }).mul(1 + slippage / 100);
  } catch {
    // pass
  }
  const isRoute = swapPairs.length === 2;

  const handleConfirm = async () => {
    // const adapter = walletService.getWalletAdapter(walletInfo?.adapterId as string);
    const dexPair = new DexBetaPairContract(new Address(swapPairs[0].address));
    // console.log(left, address.toString());
    if (!swapPairs[0].rightToken.address) {
      if (isRoute) {
        const minReceived0 = getOutAmount(
          inAmount,
          swapPairs[0].leftReserved,
          swapPairs[0].rightReserved
        );
        const minReceived0D = CoinsToDecimals(
          minReceived0,
          swapPairs[0].rightToken.decimals
        );
        const payload = dexPair.createRouteSwapRequest(
          inAmount,
          minReceived0D,
          minReceived,
          walletInfo?.address as Address,
          swapPairs[1].address,
          referral
        );
        await walletInfo?.sendTransaction({
          to: swapWallets.left.wallet!.toString("base64", { bounceable: true }),
          value: new Coins(0.6).toNano(),
          payload: BOC.toBase64Standard(payload),
          // .replaceAll('+', '-')
          // .replaceAll('/', '_'),
        });
      } else {
        const payload = dexPair.createJettonSwapRequest(
          extract,
          extract ? maxSold : inAmount,
          extract ? outAmount : minReceived,
          walletInfo?.address as Address,
          referral
        );
        await walletInfo?.sendTransaction({
          to: swapWallets.left.wallet!.toString("base64", { bounceable: true }),
          value: new Coins(0.3).toNano(),
          payload: BOC.toBase64Standard(payload),
          // .replaceAll('+', '-')
          // .replaceAll('/', '_'),
        });
      }
    } else {
      const payload = DexBetaPairContract.createTonSwapRequest(
        extract,
        extract ? maxSold : inAmount,
        extract ? outAmount : minReceived,
        walletInfo?.address as Address,
        referral
      );
      await walletInfo?.sendTransaction({
        to: dexPair.address.toString("base64", { bounceable: true }),
        value: new Coins(extract ? maxSold : inAmount)
          .add(new Coins(0.3))
          .toNano(),
        payload: BOC.toBase64Standard(payload),
        // .replaceAll('+', '-')
        // .replaceAll('/', '_'),
      });
    }
    // const sleep = (m: any) => new Promise(r => setTimeout(r, m))
    //
    // for (let x = 0; x < 100; x++) {
    //     const balance = await tonClient.getBalance(new Address(walletInfo?.meta.address as string))
    //     if (! tonBalance.eq(balance)) {
    //         await sleep(10000)
    //         await updateDexInfo()
    //         window.location.reload()
    //     }
    //     await sleep(1000)
    // }
    const interval = setInterval(async () => {
      const balance = await tonClient.getBalance(
        new Address(walletInfo!.address!)
      );
      if (!tonBalance.eq(balance)) {
        window.location.reload();
      }
    }, 1000);
    // window.location.reload()
    // throw Error('Payment Channel not open')
  };


  return (
    <>
      <Modal
        show={props.toggle}
        onHide={props.toggle}
        centered
        className="mobile-modal-bottom"
      >
        <Modal.Header closeButton>
          <Modal.Title>You get</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-4">
            <img src={to.image} width="48" height="48" alt={to.name} />
            <div className="ms-4">
              <h4 className="fs-20 fw-900 mb-0">{`${outAmount} ${to.symbol}`}</h4>
              <p className="mb-0 fw-500 color-grey">{`${from.name} / ${to.name}`}</p>
            </div>
          </div>
          <p className="mb-3 color-grey">
            The result is an orienteer. If the price changes by more than{" "}
            <span className="fw-700 color-blue">{`${slippage}%`}</span>, the
            transaction will be returned.
          </p>
          <ul className="list-unstyled card-alert p-3 mb-0 bg-light rounded-8">
            <li className="list-item d-flex mb-0">
              {extract ? (
                <>
                  <span className="me-auto fw-500">Maximum sold:</span>
                  <span className="color-grey">
                    {`${(maxSold ?? "0").toString()} ${swapLeft.token.symbol}`}
                  </span>
                </>
              ) : (
                <>
                  <span className="me-auto fw-500">Minimum received:</span>
                  <span className="color-grey">
                    {`${(minReceived ?? "0").toString()} ${
                      swapRight.token.symbol
                    }`}
                  </span>
                </>
              )}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-2">
          <Button className="btn btn-light me-auto" onClick={props.toggle}>
            Cancel
          </Button>
          <div onClick={props.processing}>
            <Button
              className="btn btn-red"
              onClick={async () => {
                await handleConfirm();
              }}
            >
              <i className="fa-regular fa-circle-plus me-2" />
              Confirm offer
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
