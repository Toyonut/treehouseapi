'use strict'
const express = require('express')
const router = express.Router()
const Question = require('../models/models').Question

router.param('qID', (req, res, next, id) => {
  Question.findById(id, (err, doc) => {
    if (err) { return next(err) }
    if (!doc) {
      err = new Error('Not Found')
      err.status = 404
      return next(err)
    }
    req.question = doc
    return next()
  })
})

router.param('aID', (req, res, next, id) => {
  req.answer = req.question.answers.id(id)
  if (!req.answer) {
    const err = new Error('Not Found')
    err.status = 404
    return next(err)
  }
  next()
})

// GET /questions
router.get('/', (req, res, next) => {
  Question.find({})
    .sort({createdAt: -1})
    .exec((err, questions) => {
      if (err) { return next(err) }
      return res.status(200).json(questions)
    })
})

// POST to /questions
router.post('/', (req, res, next) => {
  const question = new Question(req.body)
  question.save((err, question) => {
    if (err) { return next(err) }
    res.status(201).json(question)
  })
})

// GET /questions/:qID
router.get('/:qID', (req, res, next) => {
  return res.status(200).json(req.question)
})

// POST an answer on /questions/:qID/answers.
router.post('/:qID/answers', (req, res, next) => {
  req.question.answers.push(req.body)
  req.question.save((err, question) => {
    if (err) { return next(err) }
    res.status(201).json(question)
  })
})

// PUT to update answer with specific answer ID.
router.put('/:qID/answers/:aID', (req, res, next) => {
  req.answer.update(req.body, (err, result) => {
    if (err) { return next(err) }
    res.status(201).json(result)
  })
})

// DELETE a specific answer
router.delete('/:qID/answers/:aID', (req, res, next) => {
  req.answer.remove((err) => {
    if (err) { return next(err) }

    req.question.save((err, question) => {
      if (err) { return next(err) }
      res.status(201).json(question)
    })
  })
})

// POST to up or downvote
router.post('/:qID/answers/:aID/:direction', (req, res, next) => {
  if (req.params.direction === 'up' || req.params.direction === 'down') {
    req.vote = req.params.direction
    next()
  } else {
    const err = new Error('only up and down supported')
    err.status = 404
    next(err)
  }
}, (req, res, next) => {
  req.answer.vote(req.vote, (err, question) => {
    if (err) { return next(err) }
    res.status(201).json(question)
  })
})

module.exports = router
