const fs = require('fs')
const path = require('path')
const file = path.join(__dirname, './data.json')
const shortid = require('shortid')

// Validation functions
const validateBody = require('./validate').validateBody
const checkPost = require('./validate').checkPost

// CRUD
function getAll(limit) {
  const posts = JSON.parse(fs.readFileSync(file, 'utf-8'))
  return limit ? posts.slice(0, limit) : posts
}

function getOne(id) {
  const errors = checkPost(id)
  if (errors.length > 0) return {
    errors
  }
  const posts = JSON.parse(fs.readFileSync(file, 'utf-8'))
  return posts.find(el => el.id === id)
}

function create(body) {
  const posts = getAll()
  const errors = validateBody(body)
  if (errors.length > 0) return {
    errors
  }
  const title = body.title
  const content = body.content
  const post = {
    id: shortid.generate(),
    title,
    content
  }
  posts.push(post)
  fs.writeFileSync(file, JSON.stringify(posts))
  return post
}

function update(id, body) {
  const errors = [...checkPost(id), ...validateBody(body)]
  if (errors.length > 0) {
    return {
      errors
    }
  }
  const title = body.title
  const content = body.content
  const posts = getAll()
  const post = getOne(id)
  post.title = title
  post.content = content
  fs.writeFileSync(file, JSON.stringify(posts))
  return post
}

function destroy(id) {
  const posts = getAll()
  const errors = checkPost(id)
  if (errors.length > 0) {
    return {
      errors
    }
  }
  const post = getOne(id)
  fs.writeFileSync(file, JSON.stringfify(posts))
  return posts.splice(posts.indexOf(post), 1)
}


module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}
