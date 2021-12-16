const Article = require('../models/article')
const seedData = require('./articlesSeed.json')

Article.deleteMany({})
  .then(() => Article.create(seedData))
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit())
