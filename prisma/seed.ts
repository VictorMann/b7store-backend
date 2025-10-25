import { prisma } from "../src/libs/prisma";

async function main() {

  // Banner -----------------------------------------------------
  await prisma.banner.deleteMany();
  await prisma.banner.createMany({
    data: [
      { img: 'fake_banner.gif', link: 'categoria/banner' },
      { img: 'fake_banner.gif', link: 'categoria/banner' },
      { img: 'fake_banner.gif', link: 'categoria/banner' },
      { img: 'fake_banner.gif', link: 'categoria/banner' },
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
      { label: 'Camiseta PHP', price: 29.9, categoryId: 1, viewsCount: 2 },
      { label: 'Camiseta React', price: 19.9, categoryId: 1 },
      { label: 'Camiseta Python', price: 63.3, categoryId: 1 },
      { label: 'Camiseta Node', price: 79.9, categoryId: 1, viewsCount: 3 },
    ]
  });

  console.log("✅ Seed [Product] executado com sucesso!");

  // ProductImage ------------------------------------------
  await prisma.productImage.deleteMany();
  await prisma.productImage.createMany({
    data: [
      { productId: 1, url: 'camisa_php_blue.jpg' },
      { productId: 1, url: 'camisa_php_red.jpg' },
      { productId: 1, url: 'camisa_php_black.jpg' },
      { productId: 3, url: 'camisa_python_white.jpg' },
      { productId: 2, url: 'camisa_react.jpg' },
      { productId: 4, url: 'camisa_node.jpg' },
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