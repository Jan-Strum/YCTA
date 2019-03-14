import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import Main from './main.js'
import { resolvers, typeDefs } from './resolvers'
import { gql } from 'apollo-server'

const cache = new InMemoryCache()

const yelpClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'https://api.yelp.com/v3/graphql',
    headers: {
      authorization: process.env.YELP_API_KEY,
      'Content-Type': 'application/graphql'
    }
  }),
  resolvers,
  typeDefs
})

ReactDOM.render(
  <ApolloProvider yelpClient={yelpClient}>{/* <Main /> */}</ApolloProvider>,
  document.getElementById('root')
)

yelpClient
  .query({
    query: gql`
      query business(id: "garaje-san-francisco") {
        name
        id
        alias
        rating
        url
      }
    }
  `
  })
  .then(console.log)
