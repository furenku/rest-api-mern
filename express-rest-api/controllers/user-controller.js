var UserModel = require('../models/user-model');
var PetModel = require('../models/pet-model');


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
    let pets = req.body.pets;

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

module.exports = {
    findAll,
    findOne,
    create,
    put,
    patch,
    remove
}