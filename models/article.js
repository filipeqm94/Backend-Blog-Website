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
    likeCount: {
      type: Number,
      default: 0
    },
    comments: [
      {
        commentId: mongoose.Schema.Types.ObjectId,
        author: String,
        body: String,
        likeCount: {
          type: Number,
          default: 0
        }
      }
    ]
  },
  { timestamps: true }
)

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
