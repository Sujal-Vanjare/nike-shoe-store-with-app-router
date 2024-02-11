export const getDiscountedPricePercentage = (
  originalPrice,
  discountedPrice
) => {
  const discount = originalPrice - discountedPrice;
  const discountPercentage = (discount / originalPrice) * 100;
  return discountPercentage.toFixed(0); // Convert the discount percentage to a whole number and return it
};
