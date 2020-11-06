'use strict'

const repository = require('../repository/ordem-servico-repository');
const Validator = require('../validator/fluent-validator');

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
            res.status(404).send('Ordem de servico nao encontrado.');
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

exports.getByStatus = async(req, res, next) => {
    try {
        const data = await repository.getByStatus(req.params.status);

        if(data.length == 0) {
            res.status(404).send('Ordem de servico nao encontrado.');
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

exports.getByClienteId = async(req, res, next) => {
    try {
        const data = await repository.getByClienteId(req.params.cliente);

        if(data.length == 0) {
            res.status(404).send('Ordem de servico nao encontrado.');
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

        const data = await repository.create({
            descricao: req.body.descricao,
            preco: req.body.preco,
            cliente: req.body.cliente,
        });

        res.status(201).send({
            mensagem: 'Ordem de servico cadastrado com sucesso!',
            data: data
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

        const orderServico = this.getById(req.params.id);

        if(!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }

        if(orderServico.status !== 'ABERTO') {
            res.status(400).send({mensagem: 'Nao deves actualizar ordem de servico com status Cancelado ou Finalizado.'}).end();
            return;
        }

        const data = await repository.update(req.params.id, 
            {
                descricao: req.body.descricao,
                preco: req.body.preco,
                cliente: req.body.cliente
            });

        res.status(200).send({
            mensagem: 'Ordem de servico actualizado com sucesso!',
            data: data
        });
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao processar a requisicao.',
            error: error
        });
    }
}

exports.updateStatusFinalizada = async(req, res, next) => {
    try {
            const data = await repository.updateStatus(req.params.id, 
            {
                status: 'FINALIZADA',
                dataFinalizacao: Date.now()
            });

            if(data == null) {
                res.status(404).send('Ordem de servico nao encontrado.');
                return ;
            }

        res.status(200).send({
            mensagem: 'Ordem de servico Finalizada com sucesso!',
            data: data
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
            res.status(404).send('Ordem de servico nao encontrado.');
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

    validator.hasMinLen(data.descricao, 3, 'Descricao nao pode ser vazio e nao deve ter menos de 3 caracters');
    validator.isRequired(data.preco, 'Preco nao pode ser vazio ou null');
    validator.isRequired(data.cliente, 'Cliente nao pode ser vazio ou null');

    return validator;
}