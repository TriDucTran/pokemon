const express = require("express");
const Pokemon = require("../models/pokemons");

const pokemonRouter = express.Router();

async function getPokemon(req, res, next) {
    let pokemon;
    try {
        pokemon = await Pokemon.findById(req.params.id);

        if (pokemon == null) {
            return res.status(404).send({ message: "Cannot find that Pokemon record." });
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }

    res.pokemon = pokemon;
    next();
}

pokemonRouter.get('/pokemons', async (req, res) => {
    try {
        const pokemons = await Pokemon.find({});

        res.status(200).send(pokemons);
    } catch (err) {
        res.status(500).send(err);
    }
})

pokemonRouter.get('/pokemons/about', async (req, res) => {
    res.status(200).send("Pokémon (short for Pocket Monsters) are creatures that are central to the Pokémon world. " +
        "There are currently 901 known species that inhabit the Pokémon world. " +
        "However, it is implied that there are more waiting to be discovered. " +
        "Inherent to them are several fantastic powers not demonstrated by most real animals, " +
        "such as the manipulation of elements/aspects of life, such as electricity or fire.");
})

pokemonRouter.get('/pokemons/:id', getPokemon, (req, res) => {
    res.status(200).send(res.pokemon);
});

pokemonRouter.post('/pokemons', async (req, res) => {
    const pokemons = new Pokemon({
        name: req.body.name,
        japanese_name: req.body.japanese_name,
        height: req.body.height,
        type1: req.body.type1,
        type2: req.body.type2,
        description: req.body.description,
        url: req.body.url
    });
    try {
        const newPokemon = await pokemons.save();
        res.status(200).send(newPokemon);

    } catch (er) {
        res.status(500).send(er);
    }

})

pokemonRouter.patch('/pokemons/:id', getPokemon, async (req, res) => {
    if (req.body.name !== null) {
        res.pokemon.name = req.body.name;
    }
    if (req.body.japanese_name !== null) {
        res.pokemon.japanese_name = req.body.japanese_name;
    }
    if (req.body.height !== null) {
        res.pokemon.height = req.body.height;
    }
    if (req.body.type1 !== null) {
        res.pokemon.type1 = req.body.type1;
    }
    if (req.body.type2 !== null) {
        res.pokemon.type2 = req.body.type2;
    }
    if (req.body.description !== null) {
        res.pokemon.description = req.body.description;
    }
    if (req.body.url !== null) {
        res.pokemon.url = req.body.url;
    }

    try {
        const updatedPokemon = await res.pokemon.save();
        res.status(200).send(updatedPokemon);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

pokemonRouter.put('/pokemons/:id', getPokemon, async (req, res) => {
    try {
        await res.pokemon.updateOne(req.body);
        res.status(200).send("Pokemon updated successfully");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

pokemonRouter.delete('/pokemons/:id', getPokemon, async (req, res) => {
    try {
        await res.pokemon.deleteOne();
        res.status(200).send(`${res.pokemon.name} has been deleted.`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = pokemonRouter;