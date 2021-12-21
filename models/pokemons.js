const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    japanese_name: {
        type: String,
        required: true,
        trim: true,
    },
    height: {
        type: Number,
        required: true,
    },
    type1: {
        type: String,
        required: true,
        trim: true,
    },
    type2: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
},
    {
        versionKey: false,
    });

const Pokemon = mongoose.model("Pokemon", pokemonSchema, "pokemon");

module.exports = Pokemon;