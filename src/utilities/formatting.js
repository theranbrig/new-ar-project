export const formatProductName = name => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatPrice = price => {
  return `$${(price / 100).toFixed(2)}`;
};
