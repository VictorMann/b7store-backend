import { NextFunction, Request, Response } from "express";
import { getUserIdByToken } from "../services/user";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: 'Acesso negado!' });
    return;
  }
  const token = authorization?.split('Bearer ')[1];
  if (!token) {
    res.status(401).json({ error: 'Acesso negado!' });
    return;
  }

  const userId = await getUserIdByToken(token);
  if (!userId) {
    res.status(401).json({ error: 'Acesso negado!' });
    return;
  }

  (req as any).userId = userId;
  next();
};