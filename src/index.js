const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {  useNewUrlParser: true, useUnifiedTopology: true } );

const app = express();

app.use(cors());
app.use(express.json());

app.use(require('./routes'))

app.listen(3000);