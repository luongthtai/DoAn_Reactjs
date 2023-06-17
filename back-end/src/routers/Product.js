const express = require('express')
const ProductController = require('../controllers/ProductController')
const product_router = express.Router()
const upload = require('../uploadFile/ProductUpload')

product_router.get('/', ProductController.index)
product_router.get('/info/:id', ProductController.show)
product_router.get('/count/:id', ProductController.count)
product_router.get('/shop/:id', ProductController.showProductShop)
product_router.get('/showAll/:id', ProductController.showAllProductShop)
product_router.post('/create/:id', upload.any(), ProductController.create)
product_router.delete('/delete/:id', ProductController.destroy)

module.exports = product_router