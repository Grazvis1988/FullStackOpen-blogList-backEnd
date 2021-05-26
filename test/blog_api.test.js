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

test.only('Is amount of blogs is correct', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.blogList.length)
})

afterAll( () => {
	mongoose.connection.close()
})
