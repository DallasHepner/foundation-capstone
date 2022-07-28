require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const {SERVER_PORT} = process.env
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

app.post('/seed', seed)

app.get('/characters', getCharacters)
app.post('/characters', createCharacter)

app.get('/', (req, res) => {
    rollbar.log("Someone loaded up your html!")
    res.sendFile(path.join(__dirname, '../index.html'))
})
app.get('/css', (req, res) => {
    rollbar.log("Someone loaded your css")
    res.sendFile(path.join(__dirname, '../index.css'))
    try{
        pictureLink()
    }catch(warning){
        rollbar.warning("Link unavailable")
    }
})
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.js'))
    try{ 
        nonExistentFunction();
    }catch(error){
        rollbar.error(error)
    }
    try{
        buttonAlert()
    }catch(critical){
        rollbar.critical("No sound plays")
    }
})

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))