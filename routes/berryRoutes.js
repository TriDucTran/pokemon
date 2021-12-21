const express = require("express");
const Berry = require("../models/berries");

const berryRouter = express.Router();

async function getBerry(req, res, next) {
    let berry;
    try {
        berry = await Berry.findById(req.params.id);

        if (berry == null) {
            return res.status(404).send({ message: "Cannot find that Berry record." });
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }

    res.berry = berry;
    next();
}

berryRouter.get('/berries', async (req, res) => {
    try {
        const berries = await Berry.find({});

        res.status(200).send(berries);
    } catch (err) {
        res.status(500).send(err);
    }
})

berryRouter.get('/berries/about', async (req, res) => {
    res.status(200).send("Berries are small, juicy, fleshy fruit. As in the real world, " +
        "a large variety exists in the Pokémon world, with a large range of flavors and effects");
})

berryRouter.get('/berries/:id', getBerry, (req, res) => {
    res.status(200).send(res.berry);
});

berryRouter.post('/berries', async (req, res) => {
    const berries = new Berry({
        name: req.body.name,
        firmness: req.body.firmness,
        type: req.body.type,
        description: req.body.description,
        url: req.body.url
    });
    try {
        const newBerry = await berries.save();
        res.status(200).send(newBerry);

    } catch (er) {
        res.status(500).send(er);
    }

})

berryRouter.patch('/berries/:id', getBerry, async (req, res) => {
    if (req.body.name !== null) {
        res.berry.name = req.body.name;
    }
    if (req.body.firmness !== null) {
        res.berry.firmness = req.body.firmness;
    }
    if (req.body.type !== null) {
        res.berry.type = req.body.type;
    }
    if (req.body.description !== null) {
        res.berry.description = req.body.description;
    }
    if (req.body.url !== null) {
        res.berry.url = req.body.url;
    }

    try {
        const updatedBerry = await res.berry.save();
        res.status(200).send(updatedBerry);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

berryRouter.put('/berries/:id', getBerry, async (req, res) => {
    try {
        await res.berry.updateOne(req.body);
        res.status(200).send("Berry updated successfully");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

berryRouter.delete('/berries/:id', getBerry, async (req, res) => {
    try {
        await res.berry.deleteOne();
        res.status(200).send(`${res.berry.name} has been deleted.`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = berryRouter;