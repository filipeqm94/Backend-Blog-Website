const express = require('express')
const Article = require('../models/article')
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
  const { comment, articleId } = req.body
  Comments.create(comment).then(comment => {
    Article.findByIdAndUpdate(
      articleId,
      { $push: { comments: comment._id } },
      { new: true }
    )
      .populate('comments')
      .then(data => res.json(data))
  })
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
