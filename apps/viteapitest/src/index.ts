import express from 'express'
import a from '@app/appwrite-ssr'

a.none()

const app = express()

console.log('fdsaj')

app.get('/', (req, res) => res.send('This is experiences api graphql'))

export default app
