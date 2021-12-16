const express = require('express')
const Comments = require('../models/comment')

const CommentsRouter = express.Router()

CommentsRouter.get('/', (req, res, next) => {
  Comments.find({})
    .then(comments => res.json(comments))
    .catch(next)
})

CommentsRouter.post('/', (req, res, next) => {
  Comments.create(req.body)
    .then(() => res.redirect(303, '/'))
    .catch(next)
})

CommentsRouter.put('/:id', (req, res, next) => {
  Comments.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(comments => res.json(comments))
    .catch(next)
})

CommentsRouter.delete('/:id', (req, res, next) => {
  Comments.findOneAndDelete({ _id: req.params.id })
    .then(() => res.redirect(303, '/'))
    .catch(next)
})

module.exports = CommentsRouter
