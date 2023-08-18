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
const recipeRoutes = require('./Routes/recipeRoutes')

app.use('/recipe', recipeRoutes)

// Entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mmisdfc.mongodb.net/chefevirtualdatabase?retryWrites=true&w=majority`,
)
    .then(() => {
        console.log('Conectamos ao MongoDB')
        app.listen(3000)
    })
    .catch((err) => console.log(err))