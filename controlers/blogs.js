const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('User', { url: 1, title: 1, author: 1, _id: 1 })
	res.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
	const body = req.body

	if (!!body.title && !!body.url){
		const blog = new Blog ({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes ? body.likes : 0
		})

		const savedBlog = await blog.save()
		res.json(savedBlog)
	}else{
		res.status(400).end()
	}
})

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = blogsRouter
