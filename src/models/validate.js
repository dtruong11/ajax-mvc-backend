const fs = require('fs')
const path = require('path')
const file = path.join(__dirname, 'data.json')
const posts = JSON.parse(fs.readFileSync(file, 'utf-8'))

function checkPost(id) {
  const errors = []
  const post = posts.find(el => el.id === id)
  if (!post) {
    errors.push({
      status: 404,
      message: 'Please input the right post id.'
    })
  }
  return errors
}

function validateBody(body) {
  const errors = []
  const title = body.title
  const content = body.content

  if (!title || !title.length || typeof(title) !== 'string') {
    errors.push({
      status: 400,
      message: "Please input a title"
    })
  }

  if (!content || !content.length || typeof(content) !== 'string') {
    errors.push({
      status: 400,
      message: "Please input a content"
    })
  }
  return errors
}

module.exports = {
  checkPost,
  validateBody
}
