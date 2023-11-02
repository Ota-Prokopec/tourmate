import express from 'express'

const app = express()

app.get('*', (req, res) => res.send('experiences'))

const port = process.env.PORT || 4441
app.listen(port)

export default app
