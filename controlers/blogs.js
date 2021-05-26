const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', (req, res, next) => {
	const body = req.body

	const blog = new Blog ({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	})

	blog.save()
		.then( savedBlog => {
			res.json(savedBlog)
		})
		.catch( error => next(error))
})

module.exports = blogsRouter
