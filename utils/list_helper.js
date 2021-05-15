const dummy = (blogs) => {
	return blogs.length === 0
		? 1
		: 'test for SpaceX mars lander application failed. People may get lost in space :('
}

const totalLikes = (listOfObjects) => {
	return listOfObjects.reduce((sum,i) => {
		return sum = sum + i.likes
	}, 0)
}

const favoritBlog = (listOfObjects) => {
	const favoritBlog = listOfObjects.reduce((max, i) => {
		if (i.likes > max.likes) {
			max = {
				title: i.title,
				author: i.author,
				likes: i.likes
			}
		}
		return max
	}, { likes: 0 })

	console.log(favoritBlog)
	return favoritBlog
}

module.exports = {
	dummy,
	totalLikes,
	favoritBlog,
}


