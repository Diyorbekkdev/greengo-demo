export function priceFormat(price: number) {
  const formattedNumber = price?.toFixed(2)?.replace(/\d(?=(\d{3})+\.)|(\.00$)/g, '$& ');
  return formattedNumber?.split('.')[0];
}
