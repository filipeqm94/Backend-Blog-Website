const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const router = express.Router()

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body

  User.findOne({ email: email })
    .then(user => {
      if (!bcrypt.compare(password, user.password))
        return res.status(400).json({ message: 'Invalid credentials' })

      const token = jwt.sign({ email: user.email, id: user._id }, 'test', {
        expiresIn: '1h'
      })

      res.status(200).json({ profileObj: user, token })
    })
    .catch(next)
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
            const token = jwt.sign(
              { email: user.email, id: user._id },
              'test',
              { expiresIn: '1h' }
            )

            return res.json({ profileObj: user, token })
          })
    })
    .catch(console.error)
})

module.exports = router
