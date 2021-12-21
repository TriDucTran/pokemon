const express = require("express");
const bodyParser = require('body-parser') ;
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const url = 'mongodb://localhost:27017/pokemon_world_db';
mongoose.connect(url, {useNewUrlParser: true, 
    useUnifiedTopology: true
});
const conn = mongoose.connection;
conn.once("open", function() {
    console.log("Pokemon world database connected successfully");
});

const pokemonRoutes = require('./routes/pokemonRoutes');
const berryRoutes = require('./routes/berryRoutes');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.use(pokemonRoutes);
app.use(berryRoutes);

const port = 5000;

app.listen(port, () => {
    console.log("Welcome to Pokemon world server. The server is running on port " + port);
});