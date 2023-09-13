import numbro from "numbro";

// add commas to number
export const addCommas = (number: string | number) => {
  if (typeof number === "number") {
    return numbro(number).format({ thousandSeparated: true });
  }
  return number?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};