const express = require('express')
const apiRouter = require('./api')
const app = express()

app.use(express.json())
app.use('/api/v1', apiRouter)

app.use('/', (req, res) => {
  res.send({message: 'Si ves esto en una ruta que no sea la raíz la regaste'})
})


module.exports = app