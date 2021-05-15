const listHelper = require('../utils/list_helper.js')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)

	expect(result).toBe(1)
})

describe('total likes', () => {
	const listWithOneBlog= [
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
	]

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)

		expect(result).toBe(12)
	})
})
