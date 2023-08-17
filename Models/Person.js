const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    age: Number,
    chef: Boolean,
})

module.exports = Person