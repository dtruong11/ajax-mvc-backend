// const fs = require('fs')
// const path = require('path')
// const file = path.join(__dirname, './data.json')

const data = require('./data')

// Validation functions
const validateBody = require('./validate').validateBody
const checkPost = require('./validate').checkPost

// CRUD
function getAll(limit) {
  const posts = data
  return limit ? posts.slice(0, limit) : posts
}

function getOne(id) {
  const errors = checkPost(id)
  if (errors.length > 0) return {
    errors
  }
  const posts = data
  return posts.find(el => el.id === id)
}

function create(body) {
  const posts = getAll()
  const nextId = posts.reduce((acc, ele) => Math.max(acc, ele.id), -Infinity) + 1
  const errors = validateBody(body)
  if (errors.length > 0) return {
    errors
  }
  const title = body.title
  const content = body.content
  const post = {
    id: JSON.stringify(nextId),
    title,
    content
  }
  posts.push(post)
  // fs.writeFileSync(file, JSON.stringify(posts))
  return post
}

function update(id, body) {
  // const posts = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const posts = data
  const errors = [...checkPost(id), ...validateBody(body)]
  if (errors.length > 0) {
    return {
      errors
    }
  }
  const post = posts.find(el => el.id === id)
  const title = body.title
  const content = body.content
  post.title = title
  post.content = content
  return post
}

function destroy(id) {
  const posts = data
  const post = getOne(id)
  const errors = checkPost(id)
  if (errors.length > 0) {
    return {
      errors
    }
  }
  const removed = posts.splice(posts.findIndex(el => el.id === id), 1)
  return removed
}


module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}
