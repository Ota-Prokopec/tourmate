import { Router } from 'express'
import { notificationRouter } from './notification'

export const expressRouter = Router()

export const apiKeyRouter = expressRouter.use((req, res, next) => {
	const apiKey = req.headers['experiences-api-key']
	const verified = apiKey === process.env.EXPERIENCES_API_KEY
	if (!verified) throw new Error('Invalid api key')
	next()
})

apiKeyRouter.use('/notification', notificationRouter)
