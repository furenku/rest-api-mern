var UserModel = require('../models/user-model');
var PetModel = require('../models/pet-model');

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


findAll = (req,res,next) => {

    UserModel.find({}, (err,user) => {

        if( !! err ) { 

            console.error( err );
            
            res.send( err )

        }

        res.send( user )

    })

}




findOne = (req,res,next) => {

    UserModel.findOne({_id: req.params.id}, function (err, user) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }

        res.send(user)

      })

}


create = ( req, res, next ) => {

    let name = req.body.name;
    let pets = req.body.pets.filter( onlyUnique );

    let newUser = new UserModel({
        name,
        pets
    })

    if( !! pets ) {

        if( pets.length > 0 ) {


            PetModel.find({
                '_id': { $in: pets }
            }, function(err, petsFound){
            
                if( !! err ) {
                    console.log( err );
                    res.send( err )
                }

                if( petsFound.length === pets.length ) {
                    newUser.save( (err,newUserRecord) => {

                        if( !! err ) { 
            
                            console.error( err );
                            
                            res.send( err )
            
                        }
            
                        res.send( newUserRecord )
            
                    })
                } else {
                    res.send(JSON.stringify({error: "some pets not found" }))
                }
            
            });

        }
    } else {

        newUser.save( (err,newUserRecord) => {

            if( !! err ) { 

                console.error( err );
                
                res.send( err )

            }

            res.send( newUserRecord )

        })

    }

}

put = (req,res,next) => {

    UserModel.findOne({_id: req.params.id}, function (err, user) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }
        
        if ( !! req.body.name ) {
            
            user.name = req.body.name;
            
        }
        
        user.save(function (err, savedUser) {
            
            if ( !! err ){
                console.log(err)
                res.send( err )
            }
            
            res.send(savedUser)

        })
    
      })


}


patch = (req,res,next) => {

    UserModel.findOne({_id: req.params.id}, function (err, user) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }
        
        if ( !! req.body.name ) {
            user.name = req.body.name;
        }
        
        user.save(function (err, savedUser) {
            
            if ( !! err ){
                console.log(err)
                res.send( err )
            }
            
            res.send(savedUser)

        })
    
      })

}

remove = ( req, res, next ) => {

    UserModel.findOne({_id: req.params.id}, function (err, user) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }

        var deleted_user = user;
        
        user.remove()

        res.send( deleted_user )

    })


}


getPets = (req,res,next) => {

    UserModel.findOne({_id: req.params.id}, function (err, user) {

        if ( !! err ){
            console.log(err)
            res.send( err )
        }

        PetModel.find({ '_id': { $in: user.pets } }, function( err, petsFound ) {

            res.send( petsFound )

        });


    })

}


addPet = (req,res,next) => {

    UserModel.findOne({ '_id': req.params.id }, function( err, user ) {
        
        if( !! user ) {

            let pet_id = req.body.id;
            // revisar si mascota existe en base de datos
            PetModel.findOne({ '_id': pet_id }, function( err, foundPet ) {
                
                if( !! err ) {
                    console.log(err)
                    res.send(err)
                }
                
                // si sí, AÑADIR a arreglo 'pets' del user
                if( !! foundPet ) {

                    user.pets.push( foundPet._id )

                    user.pets = user.pets.filter( onlyUnique )
                    
                    user.save( function( err, savedUser ) {

                        if( !! err ) {
                            console.log( err )
                            res.send( err )
                        }

                        res.send( savedUser );

                    });

                } else {
                    // si no, cancelar el registro 
                    res.send(JSON.stringify({error: "pet not found"}))
                }

            })



        } else {
            res.send(JSON.stringify({error:"no user found"}))
        }    
    })    



}








deletePet = (req,res,next) => {

    UserModel.findOne({ '_id': req.params.id }, function( err, user ) {
        
        if( !! user ) {

            let pet_id = req.params.pet_id;
            // revisar si mascota existe en base de datos
            PetModel.findOne({ '_id': pet_id }, function( err, foundPet ) {
                
                if( !! err ) {
                    console.log(err)
                    res.send(err)
                }
                
                // si sí, AÑADIR a arreglo 'pets' del user
                if( !! foundPet ) {

                    user.pets = user.pets.filter( pet => {
                        return ! pet.equals( foundPet._id )
                    })
                    
                    
                    user.save( function( err, savedUser ) {

                        if( !! err ) {
                            console.log( err )
                            res.send( err )
                        }

                        res.send( savedUser );

                    });

                } else {
                    // si no, cancelar el registro 
                    res.send(JSON.stringify({error: "pet not found"}))
                }

            })



        } else {
            res.send(JSON.stringify({error:"no user found"}))
        }    
    })    



}



module.exports = {
    findAll,
    findOne,
    create,
    put,
    patch,
    remove,

    getPets,
    addPet,
    deletePet

}