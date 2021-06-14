const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { userName: 1, name: 1, _id: 1 })
	res.json(blogs.map(b => b.toJSON()))
})

/*const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		return authorization.substring(7)
	}
	return null
}*/

blogsRouter.post('/', async (req, res) => {
	const body = req.body
	//	const token = getTokenFrom(req)
	const decodedToken = jwt.verify(req.token, process.env.SECRET)

	if (!( req.token && decodedToken )) {
		return res.status(401).json({
			error: 'Token missing or invalid'
		})
	}

	const user = await User.findById(decodedToken.id)

	if (!!body.title && !!body.url){
		const blog = new Blog ({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes ? body.likes : 0,
			user: user._id
		})
		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()

		res.json(savedBlog.toJSON())
	}else{
		res.status(400).end()
	}
})

blogsRouter.delete('/:id', async (req, res) => {
	const token = req.token
	const decodedToken = jwt.verify(token, process.env.SECRET)
	const blogToDelete = await Blog.findById(req.params.id)
	if (blogToDelete.user.toString() === decodedToken.id.toString()) {
		await Blog.findByIdAndRemove(req.params.id)
		const user = await User.findById(decodedToken.id.toString())
		user.blogs = user.blogs.filter( b => b !== req.params.id )
		await user.save()
		res.status(204).end()
	} else {
		res.status(401).send({ error: 'Only user who created this blog listing can delete it' })
	}

})

module.exports = blogsRouter
