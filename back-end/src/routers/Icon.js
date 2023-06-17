const express  = require('express')
const IconController = require('../controllers/IconController')
const icon_router = express.Router()

icon_router.get('/', IconController.index)

module.exports = icon_router