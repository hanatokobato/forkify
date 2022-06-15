export const moneyFomattedWithSymbol = (value: number) => {
  const formattedValue = (Math.round(value * 100) / 100).toFixed(2);
  return `$${formattedValue}`;
};
