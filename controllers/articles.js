const express = require('express')
const Article = require('../models/article')

const router = express.Router()

//GET routes
router.get('/', (req, res, next) => {
  Article.find({})
    .then(articles => res.json(articles))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id

  Article.findById({ _id: id })
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

//DELETE route
router.delete('/:id', (req, res, next) => {
  const id = req.params.id

  Article.findByIdAndDelete({ _id: id })
    .then(() => res.redirect(303, '/'))
    .catch(next)
})

module.exports = router
