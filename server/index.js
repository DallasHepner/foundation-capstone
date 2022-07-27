require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')
// const {} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))