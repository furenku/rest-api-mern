import React from 'react';

import axios from 'axios';

class UsersList extends React.Component {

    state = {
        users: []
    }
    



    async componentDidMount() {
        

        let response = await axios.get('http://localhost:3000/api/users')
        let users = response.data;

        Promise.all(users.map( user => {

            return Promise.all(
                user.pets.map( (pet_id,index) => {
                    return axios.get(`http://localhost:3000/api/pets/${pet_id}`)
                })
            ).then( petsData => {  
                user.pets = petsData.map( petData => petData.data ) 
            })
            
        })).then(()=>{
            this.setState({ users: users })
        })
        

    }



    removePet = async ( user_id, pet_id ) => {

        let response = await axios.delete(`http://localhost:3000/api/users/${user_id}/pets/${pet_id}`)

        console.log("deleted", response );
        
    }

    listPets = ( user ) => {
        return user.pets.map( pet => {
            return <li key={pet._id}>
                {pet.name}
                <button onClick={() => this.removePet( user._id, pet._id )}>
                    Quitar de Persona
                </button>
            </li>
        })
    }

    listUsers = () => {

        return this.state.users.map( user => 
            <li key={user._id}>
                
                <header>
                    <h4>
                        { user.name }
                    </h4>
                    
                    <button onClick={ () => this.props.onSelect( user ) }>
                        Añadir Mascota
                    </button>    

                </header>
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