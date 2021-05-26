const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper.js')
const Blog  = require('../models/blogs')

beforeEach( async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.blogList.map( blog => new Blog(blog))

	const promiseArray = blogObjects.map( b => b.save() )
	await Promise.all(promiseArray)
})

test('Is amount of blogs is correct', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.blogList.length)
})

test('verification of id in database', async () => {
	const blogsAtStart = await helper.blogsInDb()
	blogsAtStart.map(blog => expect(blog.id).toBeDefined())
})

test.only('A valid blog can be added', async () => {
	const beforeStart = await helper.blogsInDb()
	const newBlog = {
		title: 'Hubabuba',
		author: 'Grafas drakula',
		url: 'http://www.pasilenk.lt',
		likes: 100,
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)
	const afterEnd = await helper.blogsInDb()
	expect(afterEnd).toHaveLength(beforeStart.length + 1)

	const urlMatching  = afterEnd.map(b => b.url)
	expect(urlMatching).toContain(newBlog.url)
})



afterAll( () => {
	mongoose.connection.close()
})
