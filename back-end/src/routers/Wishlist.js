const express = require('express')
const WishListController = require('../controllers/WishListController')
const wishlist_router = express.Router()

wishlist_router.get('/:id', WishListController.index)
wishlist_router.post('/create/:id', WishListController.create)
wishlist_router.get('/check/:id/:idUser', WishListController.checkWishlist)
wishlist_router.delete('/delete/:id', WishListController.destroy)
wishlist_router.delete('/deleteToProduct/:id', WishListController.destroyToProduct)

module.exports = wishlist_router