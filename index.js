const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

let PORT = 5000
let HOST = 'localhost'
process.argv.forEach((item, index) => {
    if (item == '--port') {
        PORT = parseInt(process.argv[index + 1])
    } else if (item == '--ip') {
        HOST = process.argv[index + 1]
    }
})


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/api', routes)

app.listen(PORT, HOST, () => console.log(`server started on port http://${HOST}:${PORT}`))