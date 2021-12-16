const Comment = require('../../../models/comment')
const CommentData = require('../../commentSeeds.json')

Comment.deleteMany({})
  .then(() => {
    return Comment.insertMany(CommentData)
  })
  .then(console.log)
  .catch(console.error)
// .finally(() => {
//   process.exit()
// })
