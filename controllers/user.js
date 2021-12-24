const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const router = express.Router()

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body

  User.findOne({ email: email }).then(async user => {
    if (!user) return res.json({ message: 'Invalid credentials.' })

    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare) return res.json({ message: 'Invalid credentials.' })

    const tokenId = jwt.sign({ email: user.email, id: user._id }, 'test', {
      expiresIn: '1h'
    })

    res.json({
      profileObj: {
        name: user.name,
        email: user.email,
        _id: user._id
      },
      tokenId
    })
  })
  // .catch(next)
})

router.post('/signup', async (req, res, next) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body

  const hashedPassword = await bcrypt.hash(password, 12)

  User.findOne({ email: email })
    .then(user => {
      user
        ? res.status(400).json({ message: 'User already exists' })
        : password !== confirmPassword
        ? res.status(400).json({ message: 'Passwords do not match' })
        : User.create({
            name: firstName + ' ' + lastName,
            email: email,
            password: hashedPassword
          }).then(user => {
            const tokenId = jwt.sign(
              { email: user.email, id: user._id },
              'test',
              { expiresIn: '1h' }
            )

            res.json({
              profileObj: {
                name: user.name,
                email: user.email,
                _id: user._id
              },
              tokenId
            })
          })
    })
    .catch(console.error)
})

module.exports = router
