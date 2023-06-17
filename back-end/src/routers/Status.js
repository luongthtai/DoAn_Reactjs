const express = require('express')
const StatusController = require('../controllers/StatusController')
const status_router = express.Router()

status_router.get('/', StatusController.index)

module.exports = status_router