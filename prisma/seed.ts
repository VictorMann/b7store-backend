import { prisma } from "../src/libs/prisma";

async function main() {

  // Banner -----------------------------------------------------
  await prisma.banner.deleteMany();
  await prisma.banner.createMany({
    data: [
      { img: 'banner-1.png', link: 'categoria/banner' },
      { img: 'banner-2.png', link: 'categoria/banner' },
      { img: 'banner-3.png', link: 'categoria/banner' },
      { img: 'banner-4.png', link: 'categoria/banner' },
    ]
  });

  console.log("✅ Seed [Banner] executado com sucesso!");

  // Category --------------------------------------------------
  await prisma.category.deleteMany();
  await prisma.category.createMany({
    data: [
      { slug: 'camiseta', name: 'Camiseta' },
    ]
  });

  console.log("✅ Seed [Category] executado com sucesso!");

  // CategoryMetadata ------------------------------------------
  await prisma.categoryMetadata.deleteMany();
  await prisma.categoryMetadata.createMany({
    data: [
      { id: 'tech', categoryId: 1, name: 'Tecnologia' },
    ]
  });

  console.log("✅ Seed [CategoryMetadata] executado com sucesso!");

  // MetadataValue ------------------------------------------
  await prisma.metadataValue.deleteMany();
  await prisma.metadataValue.createMany({
    data: [
      { id: 'react',  label: 'Reach',   categoryMetadataId: 'tech' },
      { id: 'php',    label: 'PHP',     categoryMetadataId: 'tech' },
      { id: 'node',   label: 'Node',    categoryMetadataId: 'tech' },
      { id: 'python', label: 'Python',  categoryMetadataId: 'tech' },
    ]
  });

  console.log("✅ Seed [MetadataValue] executado com sucesso!");

  // Product ------------------------------------------
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: [
      { label: 'Camiseta PHP',    price: 29.9, categoryId: 1, description: 'Alguma aqui', viewsCount: 2, salesCount: 1 },
      { label: 'Camiseta React',  price: 19.9, categoryId: 1, description: 'Outra desc', salesCount: 2},
      { label: 'Camiseta Python', price: 63.3, categoryId: 1, description: 'Descrição legal', },
      { label: 'Camiseta Node',   price: 79.9, categoryId: 1, description: 'Descrição pequena', viewsCount: 3 },
    ]
  });

  console.log("✅ Seed [Product] executado com sucesso!");

  // ProductImage ------------------------------------------
  await prisma.productImage.deleteMany();
  await prisma.productImage.createMany({
    data: [
      { productId: 1, url: 'camiseta-php.png' },
      { productId: 1, url: 'camiseta-php-grafite.png' },
      { productId: 1, url: 'camiseta-laravel-azul.png' },
      { productId: 3, url: 'camiseta-html.png' },
      { productId: 2, url: 'camiseta-react-azul.png' },
      { productId: 4, url: 'camiseta-node.png' },
    ]
  });

  console.log("✅ Seed [ProductImage] executado com sucesso!");
  
  // ProductMetadata ------------------------------------------
  await prisma.productMetadata.deleteMany();
  await prisma.productMetadata.createMany({
    data: [
      { productId: 1, categoryMetadataId: 'tech', metadataValueId: 'php' },
      { productId: 2, categoryMetadataId: 'tech', metadataValueId: 'reach' },
      { productId: 3, categoryMetadataId: 'tech', metadataValueId: 'python' },
      { productId: 4, categoryMetadataId: 'tech', metadataValueId: 'node' },
    ]
  });

  console.log("✅ Seed [ProductMetadata] executado com sucesso!");
  
}

main()
  .then(async () => { 
    await prisma.$disconnect() })
  .catch(async (e) => { 
    console.error(e); 
    await prisma.$disconnect(); 
    process.exit(1); 
});