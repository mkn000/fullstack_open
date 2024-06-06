const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((previous, current) => {
    return (previous += current.likes)
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return null

  return blogs.reduce((previous, current) => {
    if (current.likes >= previous.likes) {
      return current
    } else {
      return previous
    }
  },
  { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
