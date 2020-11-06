'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    preco: {
        type: Number,
        required: true,
    },
    dataDeAbertura: {
        type: Date,
        required: true,
        default: Date.now
    },
    dataFinalizacao: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['ABERTO', 'FINALIZADA', 'CANCELADA'],
        default: 'ABERTO'
    }, 
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    }
});

module.exports = mongoose.model('OrdemServico', schema);