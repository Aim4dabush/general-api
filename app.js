// 3rd party packages
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

// routes
const productsRoute = require('./routes/products-route');

// express app
const app = express();

// port
const PORT = process.env.PORT || 3000;

// parse incoming JSON data
app.use(bodyParser.json());

// set headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/products', productsRoute);

// connect to mongodb with mongoose
mongoose.connect('mongodb+srv://Aim4dabush:talofa007@store.glumqju.mongodb.net/general-store?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    })
    .catch((err) => {
        console.log(err.message);
    });