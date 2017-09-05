'use strict'
const express = require('express')
const router = express.Router()

// GET /questions
router.get('/', (req, res, next) => {
  res.status(200).json({
    response: 'GET request'
  })
})

// POST to /questions
router.post('/', (req, res, next) => {
  res.status(200).json({
    response: 'POST request',
    body: req.body
  })
})

// just demonstrating query string handling
router.get('/query', (req, res, next) => {
  res.status(200).json({
    response: 'GET query',
    query: req.query
  })
})

// GET /questions/:qID
router.get('/:qID', (req, res, next) => {
  res.status(200).json({
    response: 'GET id',
    id: req.params.qID
  })
})

// POST an answer on /questions/:qID/answers.
router.post('/:qID/answers', (req, res, next) => {
  res.status(200).json({
    response: 'POST request to /answers/qID',
    id: req.params.qID,
    body: req.body
  })
})

// PUT to update answer with specific answer ID.
router.put('/:qID/answers/:aID', (req, res, next) => {
  res.status(200).json({
    response: 'PUT request to /:qID/answers/:aID',
    questionID: req.params.qID,
    answerID: req.params.aID,
    body: req.body
  })
})

// DELETE a specific answer
router.delete('/:qID/answers/:aID', (req, res, next) => {
  res.status(200).json({
    response: 'DELETE request to /:qID/answers/:aID',
    questionID: req.params.qID,
    answerID: req.params.aID,
    body: req.body
  })
})

// POST to up or downvote
router.post('/:qID/answers/:aID/:direction', (req, res, next) => {
  if (req.params.direction === 'up' || req.params.direction === 'down') {
    next()
  } else {
    const err = new Error('only up and down supported')
    err.status = 404
    next(err)
  }
}, (req, res, next) => {
  res.status(200).json({
    response: 'PUT request to /:qID/answers/:aID',
    questionID: req.params.qID,
    answerID: req.params.aID,
    vote: req.params.direction,
    body: req.body
  })
})

module.exports = router
