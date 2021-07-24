const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require('fs');
const path = require('path');

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3002;

const {notes} = require ('./data/notes');

// parse incoming string or array
app.use(express.urlencoded({ extended: true }));

// parse incoming json data
app.use(express.json());

// serve static files in public directory
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/',htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
})