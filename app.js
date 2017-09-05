'use strict'

const express = require('express')
const { appConfig, dbConfig } = require('./config/devSettings.json')
const bodyParser = require('body-parser').json
const router = require('./routes/routes')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(bodyParser())

// Routes
app.use('/questions', router)

// Generate 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    error: {
      status: status,
      message: err.message
    }
  })
})

app.listen(appConfig.port, () => {
  console.log(`Express listening on port ${appConfig.port}`)
})
