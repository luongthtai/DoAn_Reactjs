const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const sql = "SELECT * FROM `commoditys`"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },
    create: (req, res) => {
        const { name, details } = req.body

        const sql = "INSERT INTO `commoditys`(`commodity_name`, `details`) VALUES ('" + name + "', '" + details + "')"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Insert commodity success !!!")
        })
    },

    filter: (req, res) => {
        const data = req.body.commodity

        const sql = "SELECT * FROM `commoditys` WHERE commodity_name LIKE '%" + data + "%'"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            console.log("Search commodity !!")
            res.json(result)
        })
    }
}