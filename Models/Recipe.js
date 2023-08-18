const mongoose = require('mongoose')

const Recipe = mongoose.model('Recipe', {
    name: String,
    ingredients: String,
    preparation: String
})

module.exports = Recipe