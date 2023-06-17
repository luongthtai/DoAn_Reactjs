const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const id = req.params.id

        const sql = "SELECT * FROM `carts` WHERE `id` = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    create: (req, res) => {
        const idUser = req.body.id
        const idProduct = req.body.idProduct
        const quantity = req.body.quantity

        const sql = "INSERT INTO `carts`(`product_id`, `user_id`, `quantity`) VALUES ('" + idProduct + "','" + idUser + "','" + quantity + "')"

        if (quantity) {
            const sql1 = "INSERT INTO `carts`(`product_id`, `user_id`) VALUES ('" + idProduct + "','" + idUser + "')"

            cnt.query(sql1, (err, result) => {
                if (err) throw err

                res.status(200).send(true)
            })
        } else {
            cnt.query(sql, (err, result) => {
                if (err) throw err

                res.status(200).end()
                console.log("Insert Success !!!")
            })
        }
    }
}