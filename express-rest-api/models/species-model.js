var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/pets_db');

var SpeciesSchema = require('./schemas').SpeciesSchema

module.exports = mongoose.model('Species', SpeciesSchema)

