'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        requerid: true,
        trim: true
    },
    email: {
        type: String,
        requerid: true,
        trim: true,
        index: true,
        unique: true
    },
    telefone: {
        type: String,
        requerid: true,
        trim: true,
        index: true,
        unique: true
    },
    senha: {
        type: String,
        requerid: true,
        trim: true
    },
    roles:[{
        type: String,
        requerid: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
});

module.exports = mongoose.model('Cliente', schema);