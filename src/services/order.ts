import { Address } from "../types/address";
import { CartItem } from "../types/cart-item";

type CreateOrderParams = {
  userId: number;
  address: Address;
  shippingCost: number;
  shippingDays: number;
  cart: CartItem[]
}

export const createOrder= async ({ userId, address, shippingCost, shippingDays, cart }: CreateOrderParams) => {
  
}