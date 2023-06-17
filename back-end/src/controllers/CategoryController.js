const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const sql = "SELECT `category`.*, `commoditys`.`commodity_name`, `shops`.`name_shop`  FROM `category` INNER JOIN `commoditys` ON `category`.`commodity_id` = `commoditys`.`id` INNER JOIN `shops` ON `category`.`shop_id` = `shops`.`id`"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    create: (req, res) => {
        const { name, details, commodity, id } = req.body

        const sql = "INSERT INTO `category`(`category_name`, `details`, `commodity_id`, `shop_id`) VALUES ('" + name + "','" + details + "','" + commodity + "','" + id + "')"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Insert Category Success !!")
        })
    },

    showByIdShop: (req, res) => {
        const id = req.params.id

        const sql = "SELECT `category`.*, `shops`.`name_shop` FROM `category` INNER JOIN `shops` ON `category`.`shop_id` = `shops`.`id` WHERE `category`.`shop_id` = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    }
}