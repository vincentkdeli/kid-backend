const express = require('express')
const bodyParser = require('body-parser')
const config = require('dotenv')

import accountRoutes from './server/routes/AccountRoutes'

const port = process.env.PORT || 8001
const app = express()

config.config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/account/', accountRoutes)

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`)
})

export default app
