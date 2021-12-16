const mongoose = require('../db/connection')

const ArticleSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    likes: {
      positive: Number,
      negative: Number
    }
  },
  { timestamps: true }
)

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
