const User = require('../models/users')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
	const users = await User.find({})
	res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
	const body = req.body
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User( {
		userName: body.userName,
		name: body.name,
		passwordHash,
	})

	const saveUser = await user.save()
	res.json(saveUser)
})

module.exports = usersRouter
