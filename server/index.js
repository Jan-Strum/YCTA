const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const StationAPI = require('./datasources/station')

require('dotenv').config()

const dataSources = () => ({
  StationAPI: new StationAPI()
})

const context = {
  secrets: {}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
})

server
  .listen({ port: 4000 })
  .then(({ url }) => console.log(`🚀 app running at ${url}`))
