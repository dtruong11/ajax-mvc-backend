const model = require('../models/blog')

function getAll(req, res, next) {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.status(200).json({
    data
  })
}

function getOne(req, res, next) {
  const data = model.getOne(req.params.id)
  if (data.errors) {
    return next({
      status: 404,
      message: 'Could not find post',
      errors: data.errors
    })
  }
  res.status(200).json({
    data
  })
}

function create(req, res, next) {
  const data = model.create(req.body)
  if (data.errors) {
    return next({
      status: 400,
      message: 'Cannot create post',
      errors: data.errors
    })
  }

  res.status(201).json({
    data
  })
}

function update(req, res, next) {
  const data = model.update(req.params.id, req.body)

  if (data.errors) {
    return next({
      status: 404,
      message: 'Post is not found',
      errors: data.errors
    })
  }

  res.status(200).json({
    data
  })
}

function destroy(req, res, next) {
  const data = model.destroy(req.params.id)

  if (data.errors) {
    return next({
      status: 404,
      message: 'Post is not found',
      errors: data.errors
    })
  }

  res.status(200).json({
    data
  })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy
}
