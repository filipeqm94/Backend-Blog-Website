const mongoose = require('mongoose')

const dbName = 'blog-website'

const mongoURI =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_URL
    : 'mongodb://localhost/' + dbName

mongoose
  .connect(mongoURI)
  .then(instance =>
    console.log(`Connected to database: ${instance.connections[0].name}`)
  )
  .catch(error => console.error('Connection failed!', error))

module.exports = mongoose
