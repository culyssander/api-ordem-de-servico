'use strict'

const mongoose = require('mongoose');
const OrdemServico = mongoose.model('OrdemServico');

exports.get = async() => {
    return await OrdemServico.find().populate('cliente', 'nome');
}

exports.getById = async(id) => {
    return await OrdemServico.findById(id).populate('cliente', 'nome');
}

exports.getByStatus = async(status) => {
    return await OrdemServico.find({
        status:status}).populate('cliente', 'nome');
}

exports.getByClienteId = async(cliente) => {
    return await OrdemServico.find({
        cliente:cliente}).populate('cliente', 'nome');
}

exports.create = async(data) => {
    const ordemServico = new OrdemServico(data);
    return await ordemServico.save();
}

exports.update = async(id, data) => {
    await OrdemServico.findByIdAndUpdate(id, {
        $set:{
            descricao: data.descricao,
            preco: data.preco,
            cliente: data.cliente
        }
    });
}

exports.updateStatus = async(id, data) => {
    return await OrdemServico.findByIdAndUpdate(id, {
        $set:{
            status: data.status,
            dataFinalizacao: data.dataFinalizacao
        }
    });
}

exports.delete = async(id) => {
    return await OrdemServico.findByIdAndRemove(id);
}
