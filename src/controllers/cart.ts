import { RequestHandler } from "express";
import { cartMountSchema } from "../schemas/cart-mount-schema";
import { getProduct } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { calculateShippingSchema } from "../schemas/calculate-shipping-schema";
import { getCEP } from "../libs/frete";

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

export const calculateShipping: RequestHandler = async (req, res) => {
  const parseResult = calculateShippingSchema.safeParse(req.query);
  if (!parseResult.success) {
    res.json({ error: 'Parâmetros inválidos' });
    return;
  }

  const { zipcode } = parseResult.data;
  const shipping = await getCEP(zipcode);

  if (!shipping) {
    res.json({ error: 'CEP não encontrado' });
    return;
  }
  
  res.json({ error: null, zipcode, cost: 7.99, days: 3 });
}