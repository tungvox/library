import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import { registerValidation, loginValidation } from '../validation'
import { JWT_SECRET } from '../util/secrets'

// import { googleLogin } from '../controllers/auth'

const router = express.Router()

// REGISTER
router.post('/register', async (req, res) => {
  //Validate data before making user
  const { error } = registerValidation(req.body)
  if (error) {
    console.log(registerValidation(req.body))
    return res.status(400).send(error.details[0].message)
  }

  //Check if user exist
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exist!')

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  // Create new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
    isAdmin: req.body.isAdmin
  })
  try {
    const savedUser = await user.save()
    res.send({ user: savedUser._id })
  } catch (error) {
    res.status(400).send(error)
    console.log(error)
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  //Validate data when login
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error?.details[0].message)

  //Check if email exist
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email or password is not valid!')

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Email or password is not valid!')

  //Create and assign a token
  const token = jwt.sign({_id : user._id}, JWT_SECRET, {expiresIn: '30m'})
  res.header('auth-token', token).send(token)
  
})

// LOG OUT
router.post('/login', async (req, res) => {
  //Validate data when login
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error?.details[0].message)

  //Check if email exist
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email or password is not valid!')

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Email or password is not valid!')

  //Create and assign a token
  const token = jwt.sign({_id : user._id}, JWT_SECRET, {expiresIn: '30m'})
  res.header('auth-token', token).send(token)
  
})

export default router


