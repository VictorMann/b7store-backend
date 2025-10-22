import { compare, hash } from "bcryptjs";
import { prisma } from "../libs/prisma"
import { v4 } from "uuid";
import { Address } from "../types/address";

export const createUser = async (name: string, email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email }});
  if (existing) return null;
  const hashPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashPassword
    }
  });

  if (!user) return null;
  
  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const checkingPassword = await compare(password, user.password);
  if (!checkingPassword) return null;

  const token = v4();
  await prisma.user.update({
    where: { id: user.id },
    data: { token }
  });

  return token;
}

export const getUserIdByToken = async (token: string) => {
  const user = await prisma.user.findFirst({ where: { token } });
  return user ? user.id : null;
}

export const createAddress = async (userId: number, address: Address) => {
  return await prisma.userAddress.create({
    data: {
      userId,
      ...address
    }
  });
};