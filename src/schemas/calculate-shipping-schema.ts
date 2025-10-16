import z from "zod";

export const calculateShippingSchema = z.object({
  zipcode: z.string().regex(/^\d{5}-?\d{3}$/)
});