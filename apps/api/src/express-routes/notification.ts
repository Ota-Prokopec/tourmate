import { Router } from 'express'
import appwrite from '../lib/appwrite/appwrite'
import { notifications } from '@app/firebase-server'
import { cacheName } from '@app/settings'
import { z } from 'zod'

const zodValidationInput = z.object({
	body: z.string(),
	title: z.string(),
	img: z.string().optional(),
})

export const notificationRouter = Router()

notificationRouter.post('/send', async (req, res) => {
	const { collections } = appwrite.setAdmin()
	const { title, body, img } = zodValidationInput.parse(req.body)

	const FPBTokens = (await collections.token.listDocuments()).documents.map(
		(document) => document.fcmFirebaseToken,
	)

	const notificationsResponse = await notifications.create(
		{
			body: body,
			title: title,
			icon: `${cacheName}/icon.png`,
			imageUrl: img,
		},
		FPBTokens,
	)

	if (notificationsResponse.failureCount !== 0)
		throw new Error(
			`messaging failed with number of failed messages: ${notificationsResponse.failureCount}`,
		)
	else res.json({ status: 'ok' })
})
