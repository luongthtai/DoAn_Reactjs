const cnt = require('../db/database')

module.exports = {
    index: (req, res) => {
        const sql = "SELECT * FROM `sells`"

        cnt.query(sql, (err, result) => {
            if (err) throw err

            res.json(result)
        })
    }
}