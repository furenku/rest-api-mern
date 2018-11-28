var PetModel = require('../models/pet-model');
var SpeciesModel = require('../models/species-model');


findAll = (req,res,next) => {

    PetModel.find({}, (err,pet) => {

        if( !! err ) { 

            console.error( err );
            
            res.send( err )

        }

        res.send( pet )

    })

}




findOne = (req,res,next) => {

    PetModel.findOne({_id: req.params.id}, function (err, pet) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }

        res.send(pet)

      })

}


create = ( req, res, next ) => {

    let name = req.body.name;
    let species = req.body.species;

    let newPet = new PetModel({
        name,
        species
    })


    SpeciesModel.findOne({_id: species}, function (err, species) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }

        if( !! species ) {
            
            
            newPet.save( (err,newPetRecord) => {


                if( !! err ) { 

                    console.error( err );
                    
                    res.send( err )

                }

                res.send( newPetRecord )

            })
            
        } else {
            
            res.send( JSON.stringify({ error: "no species found"}) )

        }

    })




}

put = (req,res,next) => {

    let species = req.body.species;

    PetModel.findOne({_id: req.params.id}, function (err, pet) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }
        
        if ( !! req.body.name && !! req.body.species ) {
            
            pet.name = req.body.name;
            pet.species = req.body.species;
            
        }
        
        SpeciesModel.findOne({_id: species}, function (err, species) {

            if ( !! err ){
                console.log(err)
                res.send( err )
            }
    
            if( !! species ) {
                        
                pet.save(function (err, savedPet) {
                    
                    if ( !! err ){
                        console.log(err)
                        res.send( err )
                    }
                    
                    res.send(savedPet)

                })
            

             
            } else {
                
                res.send( JSON.stringify({ error: "no species found"}) )

            }

        })

    })

}


patch = (req,res,next) => {

    let species = req.body.species;

    PetModel.findOne({_id: req.params.id}, function (err, pet) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }
        
        if ( !! req.body.name ) {
            pet.name = req.body.name;
        }

        if ( !! req.body.species ) {
            pet.species = req.body.species;
        }
        
        if( !! req.body.species ) { 


            SpeciesModel.findOne({_id: species}, function (err, species) {

                if ( !! err ){
                    console.log(err)
                    res.send( err )
                }
        
                if( !! species ) {
                            
                    pet.save(function (err, savedPet) {
                        
                        if ( !! err ){
                            console.log(err)
                            res.send( err )
                        }
                        
                        res.send(savedPet)

                    })
                    
                } else {
                    
                    res.send( JSON.stringify({ error: "no species found"}) )

                }

            })

        } else { // if no species in body


            pet.save(function (err, savedPet) {
                        
                if ( !! err ){
                    console.log(err)
                    res.send( err )
                }
                
                res.send(savedPet)

            })
            
            
        }

    
    })

}

remove = ( req, res, next ) => {

    PetModel.findOne({_id: req.params.id}, function (err, pet) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }

        var pet = pet;
        
        pet.remove()

        res.send( pet )

    })


}

module.exports = {
    findAll,
    findOne,
    create,
    put,
    patch,
    remove
}