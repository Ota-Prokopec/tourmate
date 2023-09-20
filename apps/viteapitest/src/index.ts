import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('This is experiences api graphql'))

export default app
export const viteNodeApp = app
