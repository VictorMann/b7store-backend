import { createStripeCheckoutSesseion } from "../libs/stripe";
import { CartItem } from "../types/cart-item"

type CreatePaymentLinkParams = {
  cart: CartItem[];
  shippingCost: number;
  orderId: number;
}

export const createPaymentLink = async ({ cart, shippingCost, orderId }: CreatePaymentLinkParams) => {
  try {
    const session = await createStripeCheckoutSesseion({ cart, shippingCost, orderId });
    if (!session.url) return null;
    return session.url;
  } catch (err) {
    return null;
  }
}