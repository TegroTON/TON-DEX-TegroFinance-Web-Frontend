export const fieldNormalizer = (
  fieldName: string,
  fieldValue: string,
  set: (name: string, x: string) => void,
  maxDecimals: number = 9
) => {
  let normValue = fieldValue;
  normValue = normValue.replaceAll(",", ".");
  normValue = normValue.replace(/[^0-9\.]+/g, "");
  normValue = normValue.replace(/^0+/, "0");
  normValue = normValue.replace(/\.+$/, ".");
  normValue = normValue.replace(/^\./, "0.");
  normValue = normValue.replace(/^0(\d+)/, "$1");
  if (normValue.split(".").length - 1 > 1) {
    normValue = normValue.replace(".", ",");
    normValue = normValue.replaceAll(".", "");
    normValue = normValue.replace(",", ".");
  }
  if (normValue.split(".")[1]) {
    if (normValue.split(".")[1].length > maxDecimals) {
      normValue =
        normValue.split(".")[0] +
        "." +
        normValue.split(".")[1].slice(0, maxDecimals);
    }
  }

  set(fieldName, normValue);
};
