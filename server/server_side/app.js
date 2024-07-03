const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const cors = require('cors');
app.use(cors());


const customEnv = require('custom-env')
customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

const mongoose = require("mongoose");
// SET NODE_ENV=local && node app.js
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


app.use(express.static('public'));

app.use(express.json());

const users = require('./routes/user');
const videos = require('./routes/video');
app.use('/users', users);
app.use('/videos', videos)
app.listen(process.env.PORT);
