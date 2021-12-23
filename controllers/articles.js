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
  Article.findById(req.params.id)
    .populate('comments')
    .then(article => res.json(article))
    .catch(next)
})

//POST routes
router.post('/', (req, res, next) => {
  Article.create(req.body)
    .then(article => res.json(article))
    .catch(next)
})

/*----------UPDATE routes----------*/
//edit article
router.patch('/:id', (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(article => res.json(article))
    .catch(next)
})

//like/dislike article
router.patch('/:id/:action', (req, res, next) => {
  const id = req.params.id
  const action = req.params.action === 'like' ? 1 : -1

  Article.findByIdAndUpdate(id, { $inc: { likeCount: action } }, { new: true })
    .populate('comments')
    .then(article => res.json(article))
    .catch(next)
})

//DELETE route
router.delete('/:id', (req, res, next) => {
  const id = req.params.id

  Article.findByIdAndDelete({ _id: id })
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router
