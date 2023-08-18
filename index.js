// Configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Ler JSON
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Endpoints
const musicianRoutes = require('./Routes/musicianRoutes')

app.use('/musician', musicianRoutes)

// Entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@belamurcluster.qtnhsin.mongodb.net/belamurdatabase?retryWrites=true&w=majority`,
)
    .then(() => {
        console.log('Conectamos ao MongoDB')
        app.listen(3000)
    })
    .catch((err) => console.log(err))