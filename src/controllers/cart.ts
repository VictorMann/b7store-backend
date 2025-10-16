import { RequestHandler } from "express";
import { cartMountSchema } from "../schemas/cart-mount-schema";
import { getProduct } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";

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
