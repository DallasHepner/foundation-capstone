require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())



const port = process.env.PORT || 4044

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})