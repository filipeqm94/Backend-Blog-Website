const express = require('express')
const Comments = require('../models/comment')

const CommentsRouter = express.Router()

CommentsRouter.get('/', (req, res, next) => {
  Comments.find({})
    .then(comments => res.json(comments))
    .catch(next)
})

CommentsRouter.get('/:id', (req, res, next) => {
  Comments.findById({ _id: req.params.id })
    .then(comment => res.json(comment))
    .catch(next)
})

CommentsRouter.post('/', (req, res, next) => {
  Comments.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})

CommentsRouter.patch('/:id', (req, res, next) => {
  Comments.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(comment => res.json(comment))
    .catch(next)
})

CommentsRouter.delete('/:id', (req, res, next) => {
  Comments.findOneAndDelete({ _id: req.params.id })
    .then(comment => res.json(comment))
    .catch(next)
})

module.exports = CommentsRouter
