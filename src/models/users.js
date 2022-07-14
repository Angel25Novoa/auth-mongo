const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {Schema} = mongoose

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  lastname:{
    type: String
  },
  username: {
    type:String,
    required: true
  },
  email: {
    type:String,
    required: true,
    unique: true
  },
  password: {
    type:String,
    required: true
  },
}, {
  versionKey: false,
  timestamps: true
})

//? middleware .pre() cada que yo vaya a registrar un nuevo usuario la función dentro de pre se va a ejecutar
UserSchema.pre('save', function (next){
  // console.log('-------------------')
  // console.log(this.email, this.password)
  // console.log('-------------------')
  const hashedPassword = bcrypt.hashSync(this.password, 12)
  this.password = hashedPassword
  // console.log('-------------------')
  // console.log(this.email, this.password)
  // console.log('-------------------')
  //* Con next lo que haré será continuar con el flujo predefinido
  next()
})

const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel