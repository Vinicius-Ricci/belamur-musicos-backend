const mongoose = require('mongoose')

const Musician = mongoose.model('Musician', {
    name: String,
    instrument: String,
    email: String,
    phone: String
})

module.exports = Musician