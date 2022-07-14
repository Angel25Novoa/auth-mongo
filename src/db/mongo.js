const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_DB_URL

mongoose.connect(url, {}, () => {
  console.log('-------------------------')
  console.log('Base de datos conectada')
  console.log('-------------------------')
})

module.exports = mongoose