const { prisma } = require('../prisma/generated/prisma-client')

async function main() {

  // Create a new link
  const product = await prisma.createProduct({
    barcode : '1234',
    image: 'https://image.png',
    description : 'Simple product',
  })

  console.log(`Created new link: ${product.barcode} (ID: ${product.id})`)

  // Read all links from the database and print them to the console
  const allProducts = await prisma.products()
  console.log(allProducts)
}

main().catch(e => console.error(e))
