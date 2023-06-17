const express = require('express')
const UserController = require('../controllers/UserController')
const user_router = express.Router()

user_router.get('/', UserController.index)
user_router.get('/:id', UserController.show)
user_router.post('/register', UserController.create)
user_router.delete('/delete/:id', UserController.destroy)
user_router.post('/registerAdmin', UserController.createAdmin)
user_router.post('/login', UserController.login)
user_router.get('/logout/:id', UserController.logout)
user_router.post('/filter', UserController.filter)
user_router.post('/update/:id', UserController.update)
user_router.post('/changePassword/:id', UserController.changePassword)

module.exports = user_router