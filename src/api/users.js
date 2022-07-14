const express = require('express')
const router = express.Router()
const UserModel = require('../models/users')
const UserService = require('../services/users')

const userService = new UserService(UserModel)

// router.get('/:id', async(req, res) => {
//   // const {limit, skip}= req.query
//   const users = await userService.get(limit, skip)
//   res.send(users)
// })

router.get('/me', async(req, res) => {
  const sessionUser = req.user
  //! Esto se hace esperando que nunca se ejecute pero es una doble validación
  if(!sessionUser){
    return res.status(403).send({
      message: 'Tu no deberías estar aquí'
    })
  }
  // console.log('***********************')
  // console.log(req.user)
  // console.log('***********************')
  res.send({
    username: sessionUser.username,
  })
})

router.post('/', async (req, res) => {
  const body = req.body
  const user = await userService.create(body)
  res.status(201).send(user)
})

module.exports = router