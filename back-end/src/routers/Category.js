const express = require('express')
const CategoryController = require('../controllers/CategoryController')
const category_router = express.Router()

category_router.get('/', CategoryController.index)
category_router.post('/create', CategoryController.create)
category_router.get('/shop/:id', CategoryController.showByIdShop)

module.exports = category_router