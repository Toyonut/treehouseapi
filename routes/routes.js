'use strict'
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({response: 'get request'})
})

router.post('/', (req, res, next) => {
  res.status(200).json({response: 'post request', body: req.body})
})

router.get('/:id', (req, res, next) => {
  res.status(200).json({response: 'get id', id: req.params.id})
})

module.exports = router
