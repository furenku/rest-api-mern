import React, { Component } from 'react';


import UsersList from './users/UsersList';
import PetsList from './pets/PetsList';
import axios from 'axios';


class App extends Component {


  state = {

    selectedUser: null,
    selectedPet: null

  }

  selectUser = async (selectedUser) => {

    await this.setState({ selectedUser });
    
    this.assignPetToPerson();

  }  

  selectPet = async (selectedPet) => {

    await this.setState({ selectedPet });
    
    this.assignPetToPerson();

  }  


  assignPetToPerson = async () => {
    console.log("assign!!!", this.state.selectedUser, this.state.selectedPet );
    
    if( !! this.state.selectedUser && !! this.state.selectedPet ) {
      let response;
      response = await axios.post(`http://localhost:3000/api/users/${this.state.selectedUser._id}/pets`,{
        id: this.state.selectedPet._id 
      });

      console.log( this.state.selectedUser._id, this.state.selectedPet._id, response )

      this.setState({ selectedPet: null, selectedUser: null });

    }

  }

  render() {
    return (
      <>
        <UsersList onSelect={ (user) => this.selectUser(user) }></UsersList>
        <PetsList onSelect={ (user) => this.selectPet(user) }></PetsList>
      </>
    );
  }


}

export default App;
