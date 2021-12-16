const express = require('express')
const Article = require('../models/article')

const router = express.Router()

router.get('/', (req, res, next) => {
  Article.find({}).then(articles => res.json(articles))
})

module.exports = router
