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
}

main()
  .then(async () => { 
    await prisma.$disconnect() })
  .catch(async (e) => { 
    console.error(e); 
    await prisma.$disconnect(); 
    process.exit(1); 
});