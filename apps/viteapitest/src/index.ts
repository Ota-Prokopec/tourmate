import express from 'express'

const app = express()

console.log('fdfdssaj')

app.get('/', (req, res) => res.send('This is experiences api graphql'))

export default app
