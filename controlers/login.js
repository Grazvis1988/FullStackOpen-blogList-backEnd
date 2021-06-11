const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
	const body = req.body
	const user = await User.findOne({ userName: body.userName })

	const passwordCorrect = user === null
		? false
		: await bcrypt.compare( body.password, user.passwordHash )

	if (!( user && passwordCorrect)) {
		return res.status(401).json({
			error: 'Invalid username or password'
		})
	}

	const userForToken = {
		userName: body.userName,
		id: user._id
	}

	const token = jwt.sign( userForToken, process.env.SECRET )

	res.status(200).send({ token, userName: user.userName, name: user.name })
})

module.exports = loginRouter
