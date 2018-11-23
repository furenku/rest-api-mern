const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const SpeciesController = require('./controllers/species-controller');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


app.get('/', (req,res,next) => {
    res.send("<h1>Mi app</h1>")
});


app.get('/api/species', SpeciesController.findAll );
app.get('/api/species/:id', SpeciesController.findOne );
app.post('/api/species', SpeciesController.create );
app.patch('/api/species/:id', SpeciesController.patch );
app.delete('/api/species/:id', SpeciesController.remove );



app.listen( 3000, () => { console.log("app en 3000" )});