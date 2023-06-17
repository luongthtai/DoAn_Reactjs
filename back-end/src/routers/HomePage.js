const express = require('express')
const HomePageController = require('../controllers/HomePageController')
const homepage_router = express.Router()

homepage_router.get('/', HomePageController.index)
homepage_router.post('/create', HomePageController.create)

module.exports = homepage_router