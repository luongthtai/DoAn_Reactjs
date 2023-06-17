const express = require('express')
const ShopController = require('../controllers/ShopController')
const shop_router = express.Router()
const upload = require('../uploadFile/ShopUpload')

shop_router.get('/', ShopController.index)
shop_router.get('/info/:id', ShopController.show)
shop_router.get('/user/:id', ShopController.showByIdUser)
shop_router.post('/create', upload.any(), ShopController.create)

module.exports = shop_router