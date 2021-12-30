const express = require('express')
const Article = require('../models/article')
const Comments = require('../models/comment')
const auth = require('../middleware/auth')

const CommentsRouter = express.Router()

CommentsRouter.get('/', (req, res, next) => {
  Comments.find({})
    .then(comments => res.json(comments))
    .catch(next)
})

CommentsRouter.post('/', auth, (req, res, next) => {
  const { comment, articleId } = req.body
  Comments.create(comment)
    .then(comment => {
      Article.findByIdAndUpdate(
        articleId,
        { $push: { comments: comment._id } },
        { new: true }
      )
        .populate('comments')
        .then(data => res.json(data))
    })
    .catch(next)
})

CommentsRouter.patch('/:id', auth, (req, res, next) => {
  Comments.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(comment => res.json(comment))
    .catch(next)
})

CommentsRouter.delete('/:id', auth, (req, res, next) => {
  Comments.findOneAndDelete({ _id: req.params.id })
    .then(comment => res.json(comment))
    .catch(next)
})

module.exports = CommentsRouter
