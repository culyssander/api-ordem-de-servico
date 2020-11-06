'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controller/cliente-controller');

router.get('/', controller.get);

router.get('/:id', controller.getById);

router.get('/email/:email', controller.getByEmail);

router.get('/telefone/:telefone', controller.getByTelefone);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/:id', controller.delete);

module.exports = router;