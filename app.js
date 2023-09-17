const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

mongoose.connect('mongodb+srv://Aim4dabush:talofa007@store.glumqju.mongodb.net/general-store?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    })
    .catch((err) => {
        console.log(err.message);
    });