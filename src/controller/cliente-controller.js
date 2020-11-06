'use strict'

const repository = require('../repository/cliente-repository');
const Validator = require('../validator/fluent-validator');
const md5 = require('md5');

exports.get = async(req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao processar a requisicao.',
            error: error
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        if(data == null) {
            res.status(404).send('Cliente nao encontrado.');
            return ;
        }

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao processar a requisicao.',
            error: error
        });
    }
}

exports.getByEmail = async(req, res, next) => {
    try {
        const data = await repository.getByEmail(req.params.email);

        if(data == null) {
            res.status(404).send('Cliente nao encontrado.');
            return ;
        }

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao processar a requisicao.',
            error: error
        });
    }
}

exports.getByTelefone = async(req, res, next) => {
    try {
        const data = await repository.getTelefone(req.params.telefone);
        if(data == null) {
            res.status(404).send('Cliente nao encontrado.');
            return ;
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao processar a requisicao.',
            error: error
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        const validator = validatorData(req.body);

        if(!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }

        const cliente = await repository.create({
            nome:req.body.nome,
            email:req.body.email,
            telefone: req.body.telefone,
            senha: md5(req.body.senha + global.SEC_KEY),
            roles: req.body.roles
        });

        res.status(201).send({
            mensagem: 'Cliente cadastrado com sucesso!',
            data: cliente
        });
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao processar a requisicao.',
            error: error
        });
    }
}

exports.put = async(req, res, next) => {
    try {
        const validator = validatorData(req.body);
        
        if(!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }

        const cliente = await repository.update(req.params.id, {
            nome:req.body.nome,
            email:req.body.email,
            telefone: req.body.telefone,
            senha: md5(req.body.senha + global.SEC_KEY),
            roles: req.body.roles
        });

        res.status(201).send({
            mensagem: 'Cliente actualizado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao processar a requisicao.',
            error: error
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        const data = await repository.delete(req.params.id);

        if(data == null) {
            res.status(404).send('Cliente nao encontrado.');
            return ;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao processar a requisicao.',
            error: error
        });
    }
}

const validatorData = (data) => {
    const validator = new Validator();

    validator.hasMinLen(data.nome, 3, 'Nome nao pode ser vazio e nao deve ter menos de 3 caracters');
    validator.hasMinLen(data.telefone, 8, 'Telefone nao pode ser vazio e nao deve ter menos de 8 caracters');
    validator.hasMinLen(data.senha, 3, 'Senha nao pode ser vazio e nao deve ter menos de 3 caracters');
    validator.isEmail(data.email, 'Email invalido');
    
    return validator;
}