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

app.get('/pokedex', (req, res) => {
    res.send()
})


///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, (req, res) => {
    console.log(`Server up on port: ${PORT}`)
});