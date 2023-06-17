const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'reactjs',
    password: '123456',
    database: 'shop'
})

module.exports = connection