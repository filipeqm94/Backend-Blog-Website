const mongoose = require('../db/connection')

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article'
    },
    author: {
      type: String,
      default: 'Anonymous'
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

const Comment = mongoose.model('gaphhy', CommentSchema)

module.exports = Comment
