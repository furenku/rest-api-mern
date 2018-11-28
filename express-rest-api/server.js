const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const SpeciesController = require('./controllers/species-controller');
const PetController = require('./controllers/pet-controller');
const UserController = require('./controllers/user-controller');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


app.get('/', (req,res,next) => {
    res.send("<h1>Mi app</h1>")
});


app.get('/api/species', SpeciesController.findAll );
app.get('/api/species/:id', SpeciesController.findOne );
app.post('/api/species', SpeciesController.create );
app.put('/api/species/:id', SpeciesController.put );
app.patch('/api/species/:id', SpeciesController.patch );
app.delete('/api/species/:id', SpeciesController.remove );

app.get('/api/pets', PetController.findAll );
app.get('/api/pets/:id', PetController.findOne );
app.post('/api/pets', PetController.create );
app.put('/api/pets/:id', PetController.put );
app.patch('/api/pets/:id', PetController.patch );
app.delete('/api/pets/:id', PetController.remove );

app.get('/api/users', UserController.findAll );
app.get('/api/users/:id', UserController.findOne );
app.post('/api/users', UserController.create );
app.put('/api/users/:id', UserController.put );
app.patch('/api/users/:id', UserController.patch );
app.delete('/api/users/:id', UserController.remove );


app.listen( 3000, () => { console.log("app en 3000" )});