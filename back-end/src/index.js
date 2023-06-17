const express = require('express')
const app = express()

const path = require('path')

const db = require('./db/database')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// config router
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-type, Accept')
    next()
})

// routers
const commodityRouter = require('./routers/Commodity')
const userRouter = require('./routers/User')
const shopRouter = require('./routers/Shop')
const categoryRouter = require('./routers/Category')
const sellRouter = require('./routers/Sell')
const uploadRouter = require('./routers/UploadImg')
const productRouter = require('./routers/Product')
const cartRouter = require('./routers/Cart')
const homeRouter = require('./routers/HomePage')
const statusRouter = require('./routers/Status')
const wishlistRouter = require('./routers/Wishlist')
const iconRouter = require('./routers/Icon')

// static file
// app.use('/static', express.static(path.join(__dirname, '../front-end/src/assets/image')))
app.use('/static', express.static(path.join(__dirname, 'public')))

// console.log(__dirname)

// middlewares
// const authMiddleware = require('./middleware/auth.middleware')

// connect database
db.connect(err => {
    err ? console.log(err) : console.log("Connect database success !!!")
})

app.use('/commoditys', commodityRouter)
app.use('/users', userRouter)
app.use('/shops', shopRouter)
app.use('/categories', categoryRouter)
app.use('/sells', sellRouter)
app.use('/update', uploadRouter)
app.use('/products', productRouter)
app.use('/carts', cartRouter)
app.use('/home', homeRouter)
app.use('/status', statusRouter)
app.use('/wishlist', wishlistRouter)
app.use('/icons', iconRouter)

// port
const port = 8080

app.listen(port, console.log(`http://localhost:${port}`))