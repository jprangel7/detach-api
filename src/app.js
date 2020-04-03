const express = require('express');
const mongoose = require('mongoose');
const connection = require('./config/connection.json');

const routes = require('./routes');

const app = express();

mongoose.connect(connection.db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(express.json());
app.use(routes);

app.listen(3333);