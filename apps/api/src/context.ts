import { Request, Response } from 'express'

export const context = ({ req, res }: { res: Response; req: Request }) => {
	console.log({ cookies: req.cookies })

	return {
		req,
		res,
	}
}

export type Context = ReturnType<typeof context>
