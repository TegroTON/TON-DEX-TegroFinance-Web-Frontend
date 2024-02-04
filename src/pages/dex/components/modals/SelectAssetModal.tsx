import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Modal, Form, InputGroup } from "react-bootstrap";
import { Asset, Pool } from "../../../../store/api/dexApiTypes";
import {
  useGetAssetsQuery,
  useGetPoolsQuery,
} from "../../../../store/api/dexApiSlice";
import { useTranslation } from "react-i18next";

export type TokenModalProps = {
  currentAssetKey: string;
  setCurrentAsset: (x: string) => void;
  otherCurrentAssetKey: string;
  setOtherCurrentAsset?: (x: string) => void;
  isFromModal?: boolean;
  modalId: string;
};

export function SelectAssetModal({
  currentAssetKey,
  setCurrentAsset,
  otherCurrentAssetKey,
  setOtherCurrentAsset,
  isFromModal = false,
  modalId,
}: TokenModalProps) {
  const { t } = useTranslation();

  const { register, watch } = useForm({ mode: "onChange" });

  const { data: pools } = useGetPoolsQuery();
  const { data: assets } = useGetAssetsQuery();

  const search = useRef("");
  search.current = watch("search", "value");

  const changeSelected = async (assetContractAddress: string) => {
    setCurrentAsset(assetContractAddress);
    if (
      !poolByAssetsAddressesHashMap
        ?.get(assetContractAddress)
        ?.has(otherCurrentAssetKey) &&
      setOtherCurrentAsset
    ) {
      for (const assetKey in assets) {
        if (
          poolByAssetsAddressesHashMap
            .get(assetContractAddress)
            ?.has(assetKey) &&
          isFromModal
        ) {
          setOtherCurrentAsset(assetKey);
          break;
        }
      }
    }
  };

  const poolByAssetsAddressesHashMap = new Map<string, Map<string, Pool>>();
  for (const pool of pools || []) {
    if (!poolByAssetsAddressesHashMap.has(pool.token0_address)) {
      poolByAssetsAddressesHashMap.set(pool.token0_address, new Map());
    }
    if (!poolByAssetsAddressesHashMap.has(pool.token1_address)) {
      poolByAssetsAddressesHashMap.set(pool.token1_address, new Map());
    }
    poolByAssetsAddressesHashMap
      .get(pool.token0_address)
      ?.set(pool.token1_address, pool);
    poolByAssetsAddressesHashMap
      .get(pool.token1_address)
      ?.set(pool.token0_address, pool);
  }

  let displayAssets: Asset[] = [];

  if (isFromModal) {
    displayAssets = Object.values(assets ?? {});
  } else {
    for (const asset_key in assets) {
      const asset = assets[asset_key];
      if (asset.contract_address === otherCurrentAssetKey) {
        continue;
      }

      if (
        (poolByAssetsAddressesHashMap.has(asset_key) && isFromModal) ||
        poolByAssetsAddressesHashMap.get(asset_key)?.has(otherCurrentAssetKey)
      ) {
        displayAssets.push(asset);
      }
    }
  }

  if (search.current) {
    displayAssets = displayAssets.filter(
      (asset) =>
        asset.display_name
          ?.toLowerCase()
          .includes(search.current.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(search.current.toLowerCase())
    );
  }

  const renderAsset = (asset: Asset) => {
    return (
      <Form.Label
        className={"d-flex align-items-center hover rounded-8 px-2 py-3"}
        data-bs-dismiss="modal"
        key={asset.contract_address}
      >
        <input
          type="checkbox"
          style={{ display: "none" }}
          {...register(asset.contract_address, {
            onChange: (event) => changeSelected(asset.contract_address),
          })}
        />
        <img
          className="token-form__img rounded-circle"
          src={asset.image_url}
          width={40}
          height={40}
          alt={asset.symbol}
          onError={(e) =>
            (e.currentTarget.src =
              "/static/assets/images/token/default-token-image.png")
          }
        />
        <div className="ms-3 me-auto">
          <div className="token-form__symbol fw-500">{asset.symbol}</div>
          <div className="token-form__name fs-12 color-grey">
            {asset.display_name}
          </div>
        </div>
        <i className="fa-solid fa-angle-right me-2 color-grey" />
      </Form.Label>
    );
  };

  return (
    <div
      className="modal fade mobile-modal-bottom"
      id={modalId}
      tabIndex={-1}
      aria-hidden="true"
    >
      <Modal.Dialog centered contentClassName="p-2">
        <Modal.Header data-bs-dismiss="modal" aria-label="Close" closeButton>
          <Modal.Title>{t("tokenSelect.selectToken")}</Modal.Title>
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
                placeholder={t("tokenSelect.searchPlaceholder")}
                autoComplete="off"
                {...register("search", {})}
              />
            </InputGroup>
            <div
              className="token-form__list overflow-auto"
              style={{ maxHeight: "408px" }}
            >
              {Object.values(displayAssets || {}).map((asset) => {
                return renderAsset(asset);
              })}
            </div>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}
