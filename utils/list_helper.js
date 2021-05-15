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

module.exports = {
	dummy,
	totalLikes,
}


