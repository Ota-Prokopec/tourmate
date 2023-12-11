import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import { context } from './context'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { expressRouter } from './express-routes/router'

export const server = new ApolloServer({ schema, context: context })
//FIXME: this will be possible changed in the future
const app = express()

const start = async () => {
	await server.start()
	server.applyMiddleware({
		app,
		path: '/graphql',
		cors: false,
		bodyParserConfig: { limit: '50mb' },
	})
}

const clientHostName = process.env.CLIENT_HOSTNAME

app.use(cookieParser())
app.use(
	cors({
		origin: [
			clientHostName,
			process.env.APPWRITE_ENDPOINT,
			'https://experiences-web-lovat.vercel.app',
			'https://studio.apollographql.com',
			'https://sdz3jzhr-4444.euw.devtunnels.ms',
		],
		credentials: true,
	}),
)

app.use(express.json())
app.get('/', (req, res) => res.send('This is experiences api graphql'))
app.use('/apikey', expressRouter)

start()

const port = process.env.PORT || 4444
app.listen(port)

export default app
