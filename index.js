// Configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

// Ler JSON
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(cors({
    origin: 'exp://192.168.15.8:8081',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }));

app.use(express.json())

//Endpoints
const musicianRoutes = require('./Routes/musicianRoutes')

app.use('/musician', musicianRoutes)

// Entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const PORT = process.env.PORT || 3000;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@belamurcluster.qtnhsin.mongodb.net/?retryWrites=true&w=majority`,
)
    .then(() => {
        console.log('Conectamos ao MongoDB')
        app.listen(PORT, () =>{
            console.log(`O servidor esta rodando na porta ${PORT}`);
        })
    })
    .catch((err) => console.log(err))