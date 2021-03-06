const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/blog')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', ctrl.create)
router.put('/:id', ctrl.update)
router.delete('/:id', ctrl.destroy)

module.exports = router
