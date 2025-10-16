import { RequestHandler } from "express";
import { registerSchema } from "../schemas/register-schema";
import { createUser } from "../services/user";

export const register: RequestHandler = async (req, res) => {
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.json({ error: 'Parâmetros inválidos' });
    return;
  }

  const { name, email, password } = parseResult.data;
  const user = await createUser(name, email, password);
  if (!user) {
    res.status(400).json({ error: 'E-mail já cadastrado' });
    return;
  }

  res.status(201).json({ error: null, user });
}