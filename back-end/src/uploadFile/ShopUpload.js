const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, path.join(__dirname, '../public/shops'))
    },
    filename: (req, file, res) => {
        res(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = upload