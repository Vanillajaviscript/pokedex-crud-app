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
app.get('/', (req, res) => {
    res.send('Root');
})
//Index
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {allPokemon: pokemon})
});
//Show
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {pokemon});
});
//New
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs', {});
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

});
// UPDATE
app.put('/pokemon/:id', (req, res) => {

});
//Delete
app.delete('/pokemon/:id', (req, res) => {
 // grab the index from params
 const index = req.params.id;
 //splice the fruit from fruits
 pokemon.splice(index, 1);
 // redirect back to page
 res.redirect('/pokemon')
})


///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, (req, res) => {
    console.log(`Server up on port: ${PORT}`)
});