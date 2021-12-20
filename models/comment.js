const mongoose = require('../db/connection')

const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true
    },
    likeCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
