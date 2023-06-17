const express = require('express')
const upload_router = express.Router()
const uploadUser = require('../uploadFile/UserUpload')
const uploadProduct = require('../uploadFile/UserUpload')
const UpdateImgController = require('../controllers/UpdateImgController')

upload_router.post('/avatar/:id', uploadUser.single('avatar'), UpdateImgController.uploadAvatar)
upload_router.post('/products/:id', uploadProduct.single('product'), UpdateImgController.uploadProduct)

module.exports = upload_router
