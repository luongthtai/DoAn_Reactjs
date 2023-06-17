const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const sql = "SELECT `users`.*, `status`.status FROM `users` INNER JOIN `status` ON `users`.status_id = `status`.id"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    show: (req, res) => {
        const id = req.params.id

        const sql = "SELECT `users`.*, `status`.status FROM `users` INNER JOIN `status` ON `users`.status_id = `status`.id WHERE `users`.`id` = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    create: (req, res) => {
        const data = req.body

        const user_name = data.name
        const email = data.email
        const password = data.password

        const sql = "INSERT INTO `users`(`user_name`, `email`, `password`, `role_id`, `status_id`) VALUES ('" + user_name + "','" + email + "','" + password + "', 1, 1)"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Register success !!")
        })
    },

    update: (req, res) => {
        const data = req.body
        const id = req.params.id

        const name = data.name
        const email = req.body.email
        const phone = data.phone
        const descripe = data.descripe

        const sql = "UPDATE `users` SET `user_name`='" + name + "',`descripe`='" + descripe + "' WHERE `id` = " + id + ""
        const sqlEmail = "UPDATE `users` SET `email` = '" + email + "', `phone` = '" + phone + "' WHERE `id` = " + id + ""
        const sqlPhone = "UPDATE `users` SET `phone` = '" + phone + "' WHERE `id` = " + id + ""
        const sqlDescripe = "UPDATE `users` SET `descripe` = '" + descripe + "' WHERE `id` = " + id + ""
        const sqlName = "UPDATE `users` SET `user_name` = '" + name + "' WHERE `id` = " + id + ""

        if (name && descripe) {
            cnt.query(sql, (err, result) => {
                if (err) throw err

                res.status(200).end()
                console.log("Update Email and Descripe success !!!")
            })
        }

        if (email) {
            cnt.query(sqlEmail, (err, result) => {
                if (err) throw err

                res.status(200).end()
                console.log("Update Email success !!")
            })
        }

        if (name) {
            cnt.query(sqlName, (err, result) => {
                if (err) throw err

                res.status(200).end()
                console.log("Update Name success !!")
            })
        }

        if (phone) {
            cnt.query(sqlPhone, (err, result) => {
                if (err) throw err

                res.status(200).end()
                console.log("Update Phone success !!")
            })
        }

        if (descripe) {
            cnt.query(sqlDescripe, (err, result) => {
                if (err) throw err

                res.status(200).end()
                console.log("Update Descripe success !!")
            })
        }
    },

    destroy: (req, res) => {
        const id = req.params.id

        const sql = "DELETE FROM `users` WHERE id = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log(`Delete Success Id ${id}`)
        })
    },

    createAdmin: (req, res) => {
        const data = req.body

        const user_name = data.name
        const email = data.email
        const password = data.password

        const sql = "INSERT INTO `users`(`user_name`, `email`, `password`, `role_id`, `status_id`) VALUES ('" + user_name + "','" + email + "','" + password + "', 2, 1)"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Register success !!")
        })
    },

    login: (req, res) => {
        const data = req.body

        const email = data.email
        const password = data.password

        const sql = "SELECT `users`.*, `roles`.role FROM `users` INNER JOIN `roles` ON `users`.role_id = `roles`.id WHERE `email` = '" + email + "' AND `password` = '" + password + "'"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            if (result.length !== 0) {
                const sql2 = "UPDATE `users` SET `status_id`='2' WHERE `id` = " + result[0].id + ""
                
                res.status(200).json(result)
                
                cnt.query(sql2, (err1, result1) => {
                    if (err1) throw err1

                    console.log("Update Status User !!!")
                })
            } else {
                res.status(200).send(false)
            }
        })
    },

    logout: (req, res) => {
        const id = req.params.id

        const sql = "UPDATE `users` SET `status_id`='1' WHERE id = " + id + ""

        cnt.query(sql, (err, result) => {
            if (err) throw err

            console.log("Logout Success !!!")
        })
    },

    filter: (req, res) => {
        const data = req.body.customer

        const sql = "SELECT * FROM `users` WHERE user_name LIKE '%" + data + "%' AND email LIKE '%" + data + "%'"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            console.log("Search user !!")
            res.json(result)
        })
    },


    changePassword: (req, res) => {
        const idUser = req.params.id

        const oldPass = req.body.oldPass
        const newPass = req.body.newPass

        const sql = "SELECT `password` FROM `users` WHERE `id` = " + idUser + " AND `password` = '" + oldPass + "'"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            if (Object.keys(result).length === 0) {
                res.status(200).send(false)
            } else {
                const sqlChangePass = "UPDATE `users` SET `password` = '" + newPass + "' WHERE `id` = '" + idUser + "'"

                cnt.query(sqlChangePass, (err1, result1) => {
                    if (err1) throw err1

                    res.status(200).send(true)
                    console.log('Change Password Success !!!')
                })
            }
        })
    }
}