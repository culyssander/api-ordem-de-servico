'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controller/ordem-servico-controller');

router.get('/', controller.get);

router.get('/:id', controller.getById);

router.get('/status/:status', controller.getByStatus);

router.get('/status/finalizado/:id', controller.updateStatusFinalizada);

router.get('/cliente/:cliente', controller.getByClienteId);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/:id', controller.delete)

module.exports = router;