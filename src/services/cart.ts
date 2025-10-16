import { getFrete } from "../libs/frete"

export const getCartShipping = async (zipcode: string) => {
  // TODO: integração para calcular o frete

  let shipping = await getFrete(zipcode);
  if (!shipping) return null;

  return {
    zipcode,
    cost: 7,
    days: 3
  }
}