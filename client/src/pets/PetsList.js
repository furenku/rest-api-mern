import React from 'react';

import axios from 'axios';

class PetsList extends React.Component {

    state = {
        pets: []
    }
    


    
    async componentDidMount() {
        

        let response = await axios.get('http://localhost:3000/api/pets')
        let pets = response.data;

        
        this.setState({ pets: pets })
        

    }



    listPets = () => {

        return this.state.pets.map( pet => 
            <li key={pet._id}>
                
                <h5>
                    { pet.name }
                </h5>

                <button onClick={ () => this.props.onSelect( pet ) }>
                    Añadir Persona
                </button>    
                    
            </li>
        )
    }


    render = () => {
        return (
            <>
                <h1>
                    Mascotas
                </h1>

                <ul>
                    { this.listPets() }
                </ul>
            </>
        ) 
    }

}

export default PetsList;