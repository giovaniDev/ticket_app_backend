const express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {  useNewUrlParser: true, useUnifiedTopology: true } );

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'company')))
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'user')))
app.use(require('./routes'))

app.listen(3000);