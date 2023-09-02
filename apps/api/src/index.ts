import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import { context } from './context'
import express from 'express'

export const server = new ApolloServer({ schema, context: context })

const app = express()
server.applyMiddleware({ app })

app.listen(4444, () => {
	console.log(`🚀 graphql server ready at 4444`)
})

export const viteNodeApp = app
