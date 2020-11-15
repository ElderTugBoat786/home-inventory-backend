const { prisma } = require('../prisma/generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    info: () => `This is the API of an Inventory System`,
    products: (root,args,context) => {
      return context.prisma.products();
    },
    homes: (root,args,context,info) => {
      console.log(context.prisma);
      return context.prisma.homes();
    },
    homeProducts : (root,args,context) => {
      return context.prisma.home({id : args.id }).products()
    }
  },
  Mutation : {
    addProduct: (root,args,context) => {
      return context.prisma.createProduct({
        barcode : args.barcode,
        image: args.image,
        description : args.description,
      })
    },
    addHomes : (root,args,context) => {
      return context.prisma.createHome({
        owner: args.owner,
        city : args.city,
        region : args.region,
        number: args.number,
        cap : args.cap
      })
    },
    addHomeProduct : (root,args,context) => {
      return context.prisma.updateHome({
        data : {
          products : {
            connect : { id : args.productId}
            }
          },where : {
            id : args.homeId
          }
        }
      )
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
