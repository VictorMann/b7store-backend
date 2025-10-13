import { RequestHandler } from "express";
import { getProductSchema } from "../schemas/get-product-schema";
import { getAllProducts, getProduct, incrementProductView } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { getOneProductSchema } from "../schemas/get-one-product";
import { getCategory } from "../services/category";

export const getProducts: RequestHandler = async (req, res) => {
  const parseResult = getProductSchema.safeParse(req.query);
  if (!parseResult.success) {
    res.status(400).json({ error: 'Parâmetros inválidos' });
    return;
  }

  const { metadata, orderBy, limit } = parseResult.data;
  const parsedLimit = limit ? parseInt(limit) : undefined;
  const parsedMetadata = metadata ? JSON.parse(metadata) : undefined;

  const products = await getAllProducts({
    metadata: parsedMetadata,
    order: orderBy,
    limit: parsedLimit
  });

  const productsWithAbsoluteUrl = products.map(product => ({
    ...product,
    image: product.image ? getAbsoluteImageUrl(product.image) : null,
    liked: false // TODO: Once have like funcionallity, fetch this.
  }));

  res.json({ error: null, products: productsWithAbsoluteUrl });
}

export const getOneProduct: RequestHandler = async (req, res) => {
  const paramsResult = getOneProductSchema.safeParse(req.params);
  if (!paramsResult.success) {
    res.status(400).json({ error: 'Parâmetros inválidos' });
    return;
  }


  // Getting product
  const { id } = paramsResult.data;
  const product = await getProduct(Number(id));
  if (!product) {
    res.status(404).json({ error: 'Produto não encontrado' });
    return;
  }
  const productWithAbsoluteUrl = {
    ...product,
    images: product.images.map(image => getAbsoluteImageUrl(image))
  }

  // Getting category
  const category = await getCategory(product.categoryId);
  
  // Increment view count
  await incrementProductView(product.id);

  res.json({ 
    error: null, 
    product: productWithAbsoluteUrl,
    category
  });
}