import { RequestHandler } from "express";
import { registerSchema } from "../schemas/register-schema";
import { createAddress, createUser, loginUser } from "../services/user";
import { loginSchema } from "../schemas/login-schema";
import { addAddressSchema } from "../schemas/add-address-schema";

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

export const addAddress: RequestHandler = async (req, res) => {
  const userId = (req as any).userId;
  if (!userId) {
    res.status(401).json({ error: "Acesso negado!" });
    return;
  }

  const result = addAddressSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Parâmetros inválidos' });
    return;
  }

  const address = await createAddress(userId, result.data);
  if (!address) {
    res.status(400).json({ error: 'Ocorreu algum erro!' });
    return;
  }

  res.status(201).json({ error: null, address });
}