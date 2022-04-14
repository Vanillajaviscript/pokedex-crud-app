const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pokemon = require('./models/pokemon');
const methodOverride = require('method-override');
const morgan = require('morgan');

////////////////////////
// Setup - Import deps and create app object
////////////////////////
//////////////////////
// Declare Middleware
//////////////////////
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}));
app.use(morgan('tiny'));
app.use('/public', express.static('public'));

///////////////////////
// Declare Routes and Routers 
///////////////////////

//Index
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {allPokemon: pokemon})
});
//New
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs', {allPokemon: pokemon});
});
//Show
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {pokemon: pokemon[req.params.id]});
});
//Edit
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        pokemon: pokemon[req.params.id],
        index: req.params.id})
        res.redirect('/pokemon');
});
// CREATE
app.post('/pokemon', (req, res) => {
    pokemon.push(req.body);
    res.redirect('/pokemon')
});
// UPDATE
app.put('/pokemon/:id', (req, res) => {
    pokemon[req.params.id] = req.body;
    res.redirect('/pokemon')
});
//Delete
app.delete('/pokemon/:id', (req, res) => {
 const index = req.params.id;
 pokemon.splice(index, 1);
 res.redirect('/pokemon')
})


///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, (req, res) => {
    console.log(`Server up on port: ${PORT}`)
});