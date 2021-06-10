const User = require('../models/users')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
	const users = await User.find({})
	res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
	const body = req.body
	const saltRounds = 12
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	if (!(body.userName && body.password)) {
		return res.status(400).json({ error: 'Username or password missing' })
	} else if (body.password.length < 3) {
		return res.status(400).json({
			error: 'Password is too short. Minimum 3 charecters required'
		})
	}

	const user = new User( {
		userName: body.userName,
		name: body.name,
		passwordHash,
	})

	const saveUser = await user.save()
	res.json(saveUser)
})

module.exports = usersRouter
