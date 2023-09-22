// 3rd party packages
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

// routes
const orderRoute = require('./routes/order-route');
const productsRoute = require('./routes/products-route');
const userRoute = require('./routes/user-route');

// express app
const app = express();
dotenv.config();

// port
const PORT = process.env.PORT;

// parse incoming JSON data
app.use(bodyParser.json());

// set headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');

    next();
});

// products
app.use('/products', productsRoute);

// users
app.use('/user/:userId', (req, res, next) => {
    req.user = req.params.userId;
    next();
}, userRoute);

// connect to mongodb with mongoose
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    })
    .catch((err) => {
        console.log(err.message);
    });