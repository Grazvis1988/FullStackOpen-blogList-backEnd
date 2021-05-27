const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
	const body = req.body

	const blog = new Blog ({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0
	})

	const savedBlog = await blog.save()
	res.json(savedBlog)
})

module.exports = blogsRouter
