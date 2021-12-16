const express = require('express')
const cors = require('cors')

const app = express()

//config - start
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//config - end

//controllers - start
const testController = require('./controllers/test')
app.use('/test', testController)
//controllers - end

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => {
  console.log(`Server listening on port: ${app.get('port')}`)
})
