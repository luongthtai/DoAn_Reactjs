const express = require('express');
const CommodityController = require('../controllers/CommodityController');
const commodity_roter = express.Router()

commodity_roter.get('/', CommodityController.index)
commodity_roter.post('/create', CommodityController.create)
commodity_roter.post('/filter', CommodityController.filter)

module.exports = commodity_roter