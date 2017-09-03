'use strict'

const express = require('express')
const { appConfig, dbConfig } = require('./config/devSettings.json')

const app = express()

app.listen(appConfig.port, () => {
  console.log(`Express listening on port ${appConfig.port}`)
})
