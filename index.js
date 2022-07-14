const app = require('./src/app')
require('dotenv').config()
require('./src/db/mongo')

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`)
})