'use strict'

const express = require('express')
const { appConfig, dbConfig } = require('./config/devSettings.json')
const bodyParser = require('body-parser').json

const app = express()

app.use(bodyParser())

app.use('/', (req, res, next) => {
  if (req.body) {
    console.log(req.body)
  } else {
    console.log('no body to parse')
  }
  next()
})

app.listen(appConfig.port, () => {
  console.log(`Express listening on port ${appConfig.port}`)
})
