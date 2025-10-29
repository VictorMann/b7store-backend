import { RequestHandler } from "express";
import { getOrderBySessionIdSchema } from "../schemas/get-order-by-session-id-schema";
import { getOrderIdFromSession } from "../services/payment";
import { getOrderFromUserById, getOrdersFromUser } from "../services/order";
import { getOrderByIdSchema } from "../schemas/get-order-by-id-schema";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";

export const getOrderBySessionId: RequestHandler = async (req, res) => {
  const result = getOrderBySessionIdSchema.safeParse(req.query);
  if (!result.success) {
    res.status(400).json({ error: 'Parâmetros inválidos' });
    return;  
  }

  const { session_id } = result.data;
  const orderId = await getOrderIdFromSession(session_id);
  if (!orderId) {
    res.status(400).json({ error: 'Ocorreu um erro' });
    return;  
  }

  res.json({ error: null, orderId });
}

export const getOrders: RequestHandler = async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Acesso negado!" });
    return;
  }

  const orders = await getOrdersFromUser(userId);

  res.json({ error: null, orders });
}

export const getOrder: RequestHandler = async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Acesso negado!" });
    return;
  }

  const result = getOrderByIdSchema.safeParse(req.params);
  if (!result.success) {
    res.status(400).json({ error: "Parâmetros inválidos" });
    return;
  }

  const { id } = result.data;

  const order = await getOrderFromUserById(userId, Number(id));
  if (!order) {
    res.status(404).json({ error: "Pedido não encontrado" });
    return;
  }

  const orderAbsoluteURL = {
    ...order,
    orderItems: order.orderItems.map(item => ({
      ...item,
      product: {
        ...item.product,
        image: item.product.image ? getAbsoluteImageUrl(item.product.image) : null,
      }
    }))
  };

  res.json({ error: null, order: orderAbsoluteURL });
}