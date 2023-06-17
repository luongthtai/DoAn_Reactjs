const express = require('express')
const CartController = require('../controllers/CartController')
const cart_router = express.Router()

cart_router.get('/:id', CartController.index)
cart_router.post('/create', CartController.create)

module.exports = cart_router
