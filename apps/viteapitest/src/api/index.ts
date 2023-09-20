import express from 'express'
import ssr from '@app/appwrite-ssr'

ssr.setProject({ projectEndPoint: 'dsaf', projectId: 'fdjsalů' })

const app = express()

console.log('fdfdafdssaj')

app.get('/', (req, res) => res.send('This is experiences api graphql'))

export default app
