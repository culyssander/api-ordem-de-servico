'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const config = require('./config/config');

// Conecta ao banco
mongoose.connect(config.urlConnection, { useNewUrlParser: true, useUnifiedTopology: true, 
useCreateIndex: true, useFindAndModify: false} );

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./models/cliente-model');
require('./models/ordem-servico-model');

const indexRoute = require('./route/index-route');
const clienteRoute = require('./route/cliente-route');
const ordemServicoRoute = require('./route/ordem-servico-route');

app.use('/', indexRoute);
app.use('/clientes', clienteRoute);
app.use('/ordem-servicos', ordemServicoRoute);

module.exports = app;
