import express from 'express'

import { count } from '@app/test'

const app = express()

console.log(count)

app.get('*', (req, res) => res.send('experiences'))

const port = process.env.PORT || 4441
app.listen(port)

export default app
