const express = require('express');
const { insert, findAll, findById, update, remove } = require('../db/peopleDB');

const router = express.Router();

router.post('/', async (req, res) => {
    const person = req.body;
    try {
        const [result] = await insert(person); // e.g. result 42 from [{insertId: 42}]
        return res.status(201).json({ message: `Pessoa cadastrada com sucesso com o id ${result.insertId}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ocorreu um erro ao cadastrar uma pessoa' });
    }
});

router.get('/', async (_req, res) => {
    const result = await findAll();
    try {
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: err.sqlMessage });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await findById(id);
        if (result) return res.status(200).json(result);
        return res.status(404).json({ message: 'Pessoa não encontrada' });
    } catch (err) {
        return res.status(500).json({ message: err.sqlMessage });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const person = req.body;
    const [result] = await update(person, id);
    try {
        if (result.affectedRows > 0) return res.status(200).json({ message: `Pessoa de id ${id} atualizada com sucesso` });
        return res.status(404).json({ message: 'Pessoa não encontrada' });
    } catch (error) {
        return res.status(500).json({ message: err.sqlMessage });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const [result] = await remove(id);
    try {
        if (result.affectedRows > 0) return res.status(200).json({ message: `Pessoa de id ${id} excluída com sucesso` });
        return res.status(404).json({ message: 'Pessoa não encontrada' });
    } catch (error) {
        return res.status(500).json({ message: err.sqlMessage });
    }
});

module.exports = router;
