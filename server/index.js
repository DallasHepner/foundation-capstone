require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const {seed, getCharacters, createCharacter} = require('./seed.js')

app.use(express.json())
app.use(cors())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'ae8dee4a889e415d91f1149d79d8ce98',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


// DEV
app.post('/seed', seed)
// CHARACTERS
app.post('/create-characters', createCharacter)
app.get('/characters', getCharacters)

// GET EACH FILE
app.get('/', (req, res) => {
    rollbar.log("Someone loaded up your html!")
    res.sendFile(path.join(__dirname, '../index.html'))
})
app.get('/css', (req, res) => {
    rollbar.log("Someone loaded your css")
    res.sendFile(path.join(__dirname, '../index.css'))
})
app.get('/js', (req, res) => {
    rollbar.log("Someone loaded your js")
    res.sendFile(path.join(__dirname, '../pindex.js'))
})

const port = process.env.PORT || 4044

app.listen(port, () => console.log(`up on ${port}`))