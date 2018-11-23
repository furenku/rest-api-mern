var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/pets_db');

var PetSchema = require('./schemas').PetSchema

module.exports = mongoose.model('pet', PetSchema)

