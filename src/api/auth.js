const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const UserService = require('../services/users')
const UserModel = require('../models/users')
const AuthService = require('../services/auth')
require('dotenv').config()

const userService = new UserService(UserModel)
const authService = new AuthService(userService)
const JWT_SECRET = process.env.JWT_SECRET 

router.post('/login', async(req, res) => {
  const { email, password } = req.body
  try{
    const user = await authService.login(email, password)
    const userRole = {
      ...user,
      //! Esto está hardcodeado y probablemente necesite venir de otra base de datos o tener una ruta diferente para registrar a los administradores
      role:'admin',
      //? Aquí podemos definir las rutas a las que tendrá acceso el rol por ejemplo si cambiamos lo que esta por ['users:me'] tendremos acceso a la ruta
      permissions: ['users:foo']
    }
    //* Si la validación es aprobada entonces debo generar un token
    //* Con esto el usuario ya no tiene que mandar constantemente el correo y la contraseña
    const token = jwt.sign({
      data: userRole,
      //? Esto significa que el token expirará en una hora
      exp: Math.floor(Date.now()/1000)+(60*60)
    }, JWT_SECRET)
    res.send({
      _id: user._id,
      token
    })
  } 
  catch(err){
    console.error(err)
    res.status(401).send({
      message: err.message
    })
  }
})

module.exports = router