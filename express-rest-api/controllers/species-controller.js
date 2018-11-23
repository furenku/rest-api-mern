var SpeciesModel = require('../models/species-model');


findAll = (req,res,next) => {

    SpeciesModel.find({}, (err,species) => {

        if( !! err ) { 

            console.error( err );
            
            res.send( err )

        }

        res.send( species )

    })

}


create = ( req, res, next ) => {

    let name = req.body.name;

    let newSpecies = new SpeciesModel({ name: name })

    newSpecies.save( (err,newSpeciesRecord) => {


        if( !! err ) { 

            console.error( err );
            
            res.send( err )

        }

        res.send( newSpeciesRecord )

    })

}


patch = (req,res,next) => {

    SpeciesModel.findOne({_id: req.params.id}, function (err, species) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }
        
        if (req.body.name) species.name = req.body.name
        
        species.save(function (err, savedSpecies) {
            
            if ( !! err ){
                console.log(err)
                res.send( err )
            }
            
            res.send(savedSpecies)

        })
    
      })

}

remove = ( req, res, next ) => {

    SpeciesModel.findOne({_id: req.params.id}, function (err, species) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }

        var deleted_species = species;
        
        species.remove()

        res.send( deleted_species )

    })


}

module.exports = {
    findAll,
    // findOne,
    create,
    patch,
    remove
}