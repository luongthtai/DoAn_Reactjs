const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const id = req.params.id

        const sql = "SELECT `wishlist`.*, `products`.`product_name`,`products`.`image`, `products`.`price`, `shops`.`name_shop` FROM `wishlist` INNER JOIN `products` ON `wishlist`.`product_id` = `products`.`id` INNER JOIN `shops` ON `products`.`shop_id` = `shops`.`id` WHERE `wishlist`.`user_id` = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    create: (req, res) => {
        const idUser = req.params.id
        const idProduct = req.body.idProduct

        const sql = "INSERT INTO `wishlist`(`product_id`, `user_id`) VALUES ('" + idProduct + "','" + idUser + "')"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Add Wishlist !!!")
        })
    },

    destroy: (req, res) => {
        const id = req.params.id

        const sql = "DELETE FROM `wishlist` WHERE `id` = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Delete wishlist !!!")
        })
    },

    destroyToProduct: (req, res) => {
        const idProduct = req.params.id

        const sql = "DELETE FROM `wishlist` WHERE `product_id` = " + idProduct + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Delete wishlist By Product !!!")
        })
    },

    checkWishlist: (req, res) => {
        const idProduct = req.params.id
        const idUser = req.params.idUser

        const sql = "SELECT * FROM `wishlist` WHERE `product_id` = " + idProduct + " AND `user_id` = " + idUser + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            if (Object.keys(result).length === 0) {
                res.send(false)
            } else {
                res.status(200).send(true)
            }
        })
    }
}