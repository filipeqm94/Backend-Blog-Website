const express = require('express')
const Article = require('../models/article')

const router = express.Router()

//GET routes
router.get('/', (req, res, next) => {
  Article.find({})
    .then(articles => res.json(articles.reverse()))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id

  Article.findById({ _id: id })
    .populate('comments')
    .then(article => res.json(article))
    .catch(next)
})

//POST routes
router.post('/', (req, res, next) => {
  const body = req.body

  Article.create(body)
    .then(article => res.json(article))
    .catch(next)
})

//UPDATE routes
router.patch('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  Article.findByIdAndUpdate({ _id: id }, body, { new: true })
    .then(article => res.json(article))
    .catch(next)
})

router.patch('/:id/comments', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  Article.findByIdAndUpdate(
    { _id: id },
    { $push: { comments: body._id } },
    { new: true }
  )
    .populate('comments')
    .then(data =>
      res.json(
        ...data.comments.filter(comment => body._id === comment._id.toString())
      )
    )
})

//DELETE route
router.delete('/:id', (req, res, next) => {
  const id = req.params.id

  Article.findByIdAndDelete({ _id: id })
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router
