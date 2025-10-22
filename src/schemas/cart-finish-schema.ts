import z from "zod";

export const cartFinishSchema = z.object({
  cart: z.array(z.object({
    productId: z.number().int(),
    quantity: z.number().int().min(1)
  })).nonempty(),
  addressId: z.number().int()
});