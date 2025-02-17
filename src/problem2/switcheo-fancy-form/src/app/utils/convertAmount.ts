export const convertAmount = (
  amount: number,
  fromPrice: number,
  toPrice: number
): number => {
  if (fromPrice && toPrice) {
    return (amount * fromPrice) / toPrice;
  }
  return 0;
};
