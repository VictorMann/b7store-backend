import { RequestHandler } from "express";
import { cartMountSchema } from "../schemas/cart-mount-schema";
import { getProduct } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { cartShippingSchema } from "../schemas/cart-shipping-schema";
import { getCartShipping } from "../services/cart";

export const cartMount: RequestHandler = async (req, res) => {
  const bodyResult = cartMountSchema.safeParse(req.body);
  if (!bodyResult.success) {
    res.json({ error: 'Array de ids inválido' });
    return;
  }

  const { ids } = bodyResult.data;
  let products = [];
  for (let id of ids) {
    const product = await getProduct(id);
    if (product) {
      products.push({
        id: product.id,
        label: product.label,
        price: product.price,
        image: product.images[0] 
          ? getAbsoluteImageUrl(product.images[0])
          : null
      });
    }
  }
  


  res.json({ error: null, products });
}

export const cartShipping: RequestHandler = async (req, res) => {
  const parseResult = cartShippingSchema.safeParse(req.query);
  if (!parseResult.success) {
    res.json({ error: 'Parâmetros inválidos' });
    return;
  }

  const { zipcode } = parseResult.data;
  const shipping = await getCartShipping(zipcode);
  if (!shipping) {
    res.json({ error: 'Frete não encontrado' });
    return;
  }

  



  res.json({ error: null, ...shipping });
}