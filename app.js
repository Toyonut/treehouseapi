'use strict'

const express = require('express')
const { appConfig, dbConf } = require('./config/devSettings.json')
const bodyParser = require('body-parser').json
const router = require('./routes/routes')
const logger = require('morgan')
const mongoose = require('mongoose')

const mongoUri = `mongodb://${dbConf.user}:${dbConf.password}@${dbConf.url}:${dbConf.port}/${dbConf.name}`

const app = express()

app.use(logger('dev'))
app.use(bodyParser())

mongoose.Promise = global.Promise

mongoose.connect(mongoUri, {
  useMongoClient: true
})
.then(() => { console.log(`DBConnection to ${dbConf.url} successful`) })
.catch((err) => { logger(err) })

// set up CORS for any domain... Not secure, but this is a test app.
app.use((req, res, next) => {
  res.header('Access-Control.Allow-Origin', '*')
  res.header('Access-Control.Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control.Allow-Methods', 'PUT, POST, DELETE')
  }
  next()
})

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
