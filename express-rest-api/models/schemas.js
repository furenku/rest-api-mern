var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pets: {
        type: [mongoose.Schema.Types.ObjectId]
    }
})


var PetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: mongoose.Schema.Types.ObjectId
    }
})

var SpeciesSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    family: {
        type: String,
        // required: true
    }
})




module.exports = {
    UserSchema,
    PetSchema,
    SpeciesSchema
}