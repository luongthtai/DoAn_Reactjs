const express = require('express')
const SellController = require('../controllers/SellController')
const sell_router = express.Router()

sell_router.get('/', SellController.index)

module.exports = sell_router