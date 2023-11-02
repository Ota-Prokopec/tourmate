import express from 'express'

import appwrite from '@app/appwrite-ssr-graphql'

const app = express()

const appwriteInstance = appwrite.setProject({
	endpoint: 'http://localhost',
	hostname: 'localhost',
	projectId: 'ex',
})

app.get('*', (req, res) => res.send('experiences'))

const port = process.env.PORT || 4441
app.listen(port)

export default app
