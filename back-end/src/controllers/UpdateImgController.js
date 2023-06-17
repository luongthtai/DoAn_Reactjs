const cnt = require('../db/database')

module.exports = {
    // user

    uploadAvatar: async (req, res, next) => {
        const file = req.file
        const id = req.params.id

        if (!file) {
            console.log("error !!!")
            return next("error !!!")
        }

        const sql = "UPDATE `users` SET `avatar` = '" + "http://localhost:8080/static/users/" + file.filename + "' WHERE `id` = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("success")
        })
    },

    // product

    uploadProduct: async (req, res, next) => {
        const file = req.file
        const id = req.params.id

        if (!file) {
            console.log("error !!!")
            return next("error !!!")
        }

        const sql = "UPDATE `products` SET `image` = '" + "http://localhost:8080/static/products/" + file.filename + "' WHERE `id` = " + id + ""

        cnt.query(sql, (er, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Upload product image !!!")
        })
    },
}