const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const sql = "SELECT `products`.*, `shops`.`name_shop`, `category`.`category_name` FROM `products` INNER JOIN `shops` ON `products`.`shop_id` = `shops`.`id` INNER JOIN `category` ON `products`.`category_id` = `category`.`id` WHERE `status_id` = 1"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    showProductShop: (req, res) => {
        const id = req.params.id

        const sql = "SELECT `products`.*, `category`.`category_name` FROM `products` INNER JOIN `category` ON `products`.`category_id` = `category`.`id` WHERE `products`.`shop_id` = '" + id + "' AND `status_id` = 1"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    showAllProductShop: (req, res) => {
        const id = req.params.id

        const sql = "SELECT `products`.*, `category`.`category_name` FROM `products` INNER JOIN `category` ON `products`.`category_id` = `category`.`id` WHERE `products`.`shop_id` = '" + id + "'"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    create: (req, res) => {
        const id = req.params.id

        console.log('=======================')
        const { name, description, price, salePrice, category, status } = req.body

        const files = req.files

        var image
        var gallery

        files.map(item => {
            if (item.fieldname === 'image') {
                image = item.filename
            } else {
                gallery = item.filename
            }
        })

        const sql = "INSERT INTO `products`(`product_name`, `price`, `sale_price`, `descripe`, `image`, `sell_id`, `category_id`, `status_id`, `shop_id`) VALUES ('" + name + "','" + price + "','" + salePrice + "','" + description + "','" + "http://localhost:8080/static/products/" + image + "','" + 1 + "','" + category + "','" + status + "','" + id + "')"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Insert Product !!!")
        })
    },

    show: (req, res) => {
        const id = req.params.id

        const sql = "SELECT * FROM `products` WHERE `id` = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    count: (req, res) => {
        const idShop = req.params.id

        const sql = "SELECT COUNT(*) FROM `products` WHERE `shop_id` = " + idShop + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).send(result)
        })
    },

    destroy: (req, res) => {
        const id = req.params.id

        const sql = "DELETE FROM `products` WHERE `id` = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).send(true)
        })
    }
}