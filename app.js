'use strict'

const express = require('express')
const { appConfig, dbConfig } = require('./config/devSettings.json')
const bodyParser = require('body-parser').json
const router = require('./routes/routes')

const app = express()

app.use(bodyParser())

app.use('/questions', router)

app.listen(appConfig.port, () => {
  console.log(`Express listening on port ${appConfig.port}`)
})
