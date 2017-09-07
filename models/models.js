'use strict'

const { Schema, Model } = require('mongoose')

const sortAnswers = (a, b) => {
  if (a.votes === b.votes) {
    return b.updatedAt - a.updatedAt
  }
  return b.votes - a.votes
}

const AnswerSchema = new Schema({
  text: {type: 'string', required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type: Number, default: 0}
})

AnswerSchema.methods('update', function (updates, callback) {
  Object.assign(this, updates, {updatedAt: Date.now})
  this.parent().save(callback)
})

AnswerSchema.methods('vote', function (vote, callback) {
  if (vote === 'up') {
    this.votes += 1
  } else {
    this.votes -= 1
  }
  this.parent().save(callback)
})

const questionSchema = new Schema({
  text: {type: 'string', required: true},
  createdAt: {type: Date, default: Date.now},
  answers: [AnswerSchema]
})

questionSchema.pre('save', function (next) {
  this.answers.sort(sortAnswers)
  next()
})

const Question = new Model('Question', questionSchema)

module.exports = Question
