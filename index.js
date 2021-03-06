const express = require('express')
const cors = require('cors')

const app = express()

//config - start
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//config - end

//controllers - start
const articlesController = require('./controllers/articles')
app.use('/api/articles', articlesController)
const commentsController = require('./controllers/comments')
app.use('/api/comments', commentsController)
//controllers - end

//error handling
app.use((err, req, res, next) => {
  const statusCode = res.status || 500
  const errorMessage = err.message || 'Internal server error'

  res.status(statusCode).send(errorMessage)
})

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => {
  console.log(`Server listening on port: ${app.get('port')}`)
})
