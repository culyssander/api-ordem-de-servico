'use strict'

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.get = async() => {
    return await Cliente.find();
}

exports.getById = async(id) => {
    return await Cliente.findById(id);
}

exports.getByEmail = async(email) => {
    return await Cliente.findOne({email: email});
}

exports.getTelefone = async(telefone) => {
    return await Cliente.findOne({telefone: telefone});
}

exports.getRoles = async(role) => {
    return await Cliente.find({roles:role});
}

exports.create = async(data) => {
    const cliente = new Cliente(data);
    return await cliente.save();
}

exports.update = async(id, data) => {
    return await Cliente.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            email:data.email,
            telefone: data.telefone,
            senha: data.senha,
            roles: data.roles
        }
    });
}

exports.delete = async(id) => {
    return await Cliente.findByIdAndRemove(id);
}