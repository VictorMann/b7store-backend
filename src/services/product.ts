import { prisma } from "../libs/prisma"

type Props = {
  metadata?: { [key: string]: string },
  order?: string;
  limit?: number;
}

export const getAllProducts = async (filters: Props) => {
  // ORDER
  let orderBy = {};
  switch (filters.order) {
    case 'views': 
      orderBy = { viewsCount: 'desc' }; break;
    case 'selling': 
      orderBy = { salesCount: 'desc' }; break;
    case 'price': 
      orderBy = { price: 'asc' }; break;
  }

  // METADATA
  let where = {};

  const products = await prisma.product.findMany({
    select: {
      id: true,
      label: true,
      price: true,
      images: {
        take: 1,
        orderBy: { id: 'asc' }
      }
    },
    where,
    orderBy,
    take: filters.limit ?? undefined
  });

  return products.map(product => ({
    ...product,
    image: product.images[0] ? `media/products/${product.images[0].url}` : null,
    images: undefined
  }));
}