import { RequestHandler } from "express";
import { registerSchema } from "../schemas/register-schema";
import { createUser, loginUser } from "../services/user";
import { loginSchema } from "../schemas/login-schema";

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

export const login: RequestHandler = async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Parâmetros inválidos' });
    return;
  }

  const { email, password } = req.body;
  const token = await loginUser(email, password);
  if (!token) {
    res.status(401).json({ error: 'Acesso negado' });
    return;
  }

  res.json({ error: null, token });
}