'use strict'
const express = require('express')
const router = express.Router()

// GET /questions
router.get('/', (req, res, next) => {
  res.status(200).json(
    {
      response: 'GET request'
    }
  )
})

// POST to /questions
router.post('/', (req, res, next) => {
  res.status(200).json(
    {
      response: 'POST request',
      body: req.body
    }
  )
})

// just demonstrating query string handling
router.get('/query', (req, res, next) => {
  res.status(200).json(
    {
      response: 'GET query',
      query: req.query
    }
  )
})

// GET /questions/:id
router.get('/:qID', (req, res, next) => {
  res.status(200).json(
    {
      response: 'GET id',
      id: req.params.id
    }
  )
})

// POST an answer on /questions/:id/answers.
router.post('/:qID/answers', (req, res, next) => {
  res.status(200).json(
    {
      response: 'POST request to /answers/qID',
      id: req.params.qID,
      body: req.body
    }
  )
})

// PUT to update answer with specific answer ID.
router.put('/:qID/answers/:aID', (req, res, next) => {
  res.status(200).json(
    {
      response: 'PUT request to /:qID/answers/:aID',
      qID: req.params.qID,
      aID: req.params.aID,
      body: req.body
    }
  )
})

module.exports = router
