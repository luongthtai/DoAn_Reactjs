const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const sql = "SELECT `shops`.*, `users`.`user_name`, COUNT(`products`.`id`) AS product_count FROM `shops` INNER JOIN `users` ON `shops`.`user_id` = `users`.`id` INNER JOIN `products` ON `shops`.`id` = `products`.`shop_id` GROUP BY `shops`.`id`"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },
    create: (req, res) => {
        const { name, description, country, city, address, phone, website, id } = req.body
        const logo = req.files[0]
        const coverImg = req.files[1]

        /////////// insert shop item
        const sql = "INSERT INTO `shops`(`user_id`, `name_shop`, `logo`, `cover_img`, `description`, `country`, `city`, `address`, `phone`, `website`) VALUES ('" + id + "','" + name + "','" + "http://localhost:8080/static/shops/" + logo.filename + "','" + "http://localhost:8080/static/shops/" + coverImg.filename + "','" + description + "','" + country + "','" + city + "','" + address + "','" + phone + "','" + website + "')"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log('Create Shop Success !!!')

            /////////// update role user
            const sql2 = "UPDATE `users` SET `role_id`='2' WHERE id = " + id + ""

            cnt.query(sql2, (err1, result1) => {
                if (err1) throw err1

                console.log('Update Role User Success !!!')
            })
        })
    },

    show: (req, res) => {
        const id = req.params.id

        const sql = "SELECT `shops`.*, `users`.`user_name`, COUNT(`products`.`id`) AS product_count FROM `shops` INNER JOIN `users` ON `shops`.`user_id` = `users`.`id` INNER JOIN `products` ON `shops`.`id` = `products`.`shop_id`  WHERE `shops`.`id` = " + id + " GROUP BY `shops`.`id`"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    showByIdUser: (req, res) => {
        const id = req.params.id

        const sql = "SELECT `shops`.*, `users`.`user_name`, COUNT(`products`.`id`) AS product_count FROM `shops` INNER JOIN `users` ON `shops`.`user_id` =`users`.`id` INNER JOIN `products` ON `shops`.`id` = `products`.`shop_id` WHERE `users`.`id` = " + id + " GROUP BY `shops`.`id`"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    }
}