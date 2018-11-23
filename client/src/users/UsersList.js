import React from 'react';

import axios from 'axios';

class UsersList extends React.Component {

    state = {
        users: []
    }
    



    getUsers = () => {
/*
        const response = 
        .then( response => {

            let users = response.data;

            users = Promise.all(users.map( user => {
                
                let petsData = user.pets.map( (pet_id,index) => {
                    axios.get(`http://localhost:4000/pets/${pet_id}`)
                    .then( response => {
                        user.pets[index] = response.data
                    })
                })

                return petsData
            
    
            }))
            .then((response)=> {
                console.log("Set state");
                
                this.setState({ users: users });
    
            })
    

        })
        */

    }

    // async getPetData( pet_id ) {
    //     let pet = axios.get(`http://localhost:4000/pets/${pet_id}`)
    //     return pet;
    // }

    async componentDidMount() {
        

        let response = await axios.get('http://localhost:4000/users')
        let users = response.data;

        Promise.all(users.map( user => {

            return Promise.all(
                user.pets.map( (pet_id,index) => {
                    return axios.get(`http://localhost:4000/pets/${pet_id}`)
                })
            ).then( petsData => {  
                user.pets = petsData.map( petData => petData.data ) 
            })
            
        })).then(()=>{
            this.setState({ users: users })
        })
        

    }


    listPets = ( user ) => {
        return user.pets.map( pet => {
            return <li key={pet.id}>{pet.name}</li>
        })
    }

    listUsers = () => {

        return this.state.users.map( user => 
            <li key={user.id}>
                
                <h4>
                    { user.name }
                </h4>

                <h6>
                    Mascotas
                </h6>
                
                <ul>
                    { this.listPets( user ) }
                </ul>


            </li>
        )
    }


    render = () => {
        return (
            <ul>
                { this.listUsers() }
            </ul>
        ) 
    }

}

export default UsersList;