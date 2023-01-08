export const UseFormatPriceImpact = (ops: {priceImpact: number}) => {
    const { priceImpact } = ops;
    const strValue = priceImpact.toFixed(2);
    const formatValue = priceImpact <= 0.01 ? `<0.01%` :  priceImpact >= 99.9 ? `>99.99%` : `${strValue}%`;
    const color = priceImpact <= 10 ? "var(--green-500)" : "var(--red-500)";

    return (
        <span style={{color}}>{formatValue}</span>
    )
}

