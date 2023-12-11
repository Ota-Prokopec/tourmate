import { Router } from 'express'
import appwrite from '../lib/appwrite/appwrite'
import { notifications } from '@app/firebase-server'
import { cacheName } from '@app/settings'
import { z } from 'zod'

const zodValidationInput = z.object({
	monumentId: z.string(),
	img: z.string().optional(),
})

export const notificationRouter = Router()

notificationRouter.post('/monument/send', async (req, res) => {
	const { collections } = appwrite.setAdmin()

	const { monumentId, img } = zodValidationInput.parse(req.body)

	const FPBTokens = (await collections.token.listDocuments()).documents.map(
		(document) => document.fcmFirebaseToken,
	)

	if (FPBTokens.length === 0) {
		res.json({ status: 'ok', successCount: 0 })
		return
	}

	const notificationsResponse = await notifications.create<'newMonument'>(
		{
			data: { type: 'newMonument', monumentId: monumentId },
			icon: `${cacheName}/icon.png`,
			imageUrl: img,
		},
		FPBTokens,
	)

	if (notificationsResponse.failureCount !== 0)
		res.json({ status: 'failed', successCount: notificationsResponse.successCount })
	else res.json({ status: 'ok', successCount: notificationsResponse.successCount })
})
