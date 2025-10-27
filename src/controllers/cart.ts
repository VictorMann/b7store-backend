import { RequestHandler } from "express";
import { cartMountSchema } from "../schemas/cart-mount-schema";
import { getProduct } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { calculateShippingSchema } from "../schemas/calculate-shipping-schema";
import { getCEP } from "../libs/frete";
import { cartFinishSchema } from "../schemas/cart-finish-schema";
import { getAddressById } from "../services/user";
import { createOrder } from "../services/order";
import { createPaymentLink } from "../services/payment";

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

export const finish: RequestHandler = async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Acesso negado!" });
    return;
  }

  const result = cartFinishSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Parâmetros inválidos' });
    return;
  }

  const { cart, addressId } = result.data;
  const address = await getAddressById(userId, addressId);
  if (!address) {
    res.status(400).json({ error: 'Endereço inválido' });
    return;
  }

  const shippingCost = 7; // TODO: temporário
  const shippingDays = 3; // TODO: temporário

  const orderId = await createOrder({
    userId,
    address,
    shippingCost,
    shippingDays,
    cart
  });
  
  if (!orderId) {
    res.status(400).json({ error: 'Ocorreu um erro' });
    return;
  }

  const url = await createPaymentLink({ cart, shippingCost, orderId });

  if (!url) {
    res.status(400).json({ error: 'Ocorreu um erro' });
    return;
  }

  res.status(201).json({ error: null, url });
}
