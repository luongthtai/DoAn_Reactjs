const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const sql = "SELECT * FROM `status`"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    }
}