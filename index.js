const express = require('express')
const bodyParser = require('body-parser')

const PORT = 5000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`server started on port ${PORT}`))