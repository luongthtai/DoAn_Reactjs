const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const sql = "SELECT * FROM `homepage`"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    },

    create: (req, res) => {
        const logo = req.files[0]
        const coverImg = req.files[2]

        const { title, subtitle } = req.body

        const sql = "INSERT INTO `homepage`(`logo`, `cover_img`, `title`, `subtitle`) VALUES ('" + logo.filename + "','" + coverImg.filename + "','" + title + "','" + subtitle + "')"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.status(200).end()
            console.log("Insert homepage !!!")
        })
    }
}