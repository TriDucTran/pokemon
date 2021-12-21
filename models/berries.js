const mongoose = require('mongoose');

const berrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    firmness: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
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

const Berry = mongoose.model("Berry", berrySchema, "berry");

module.exports = Berry;