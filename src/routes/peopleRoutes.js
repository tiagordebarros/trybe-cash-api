const express = require('express');
const { insert, findAll, findById } = require('../db/peopleDB');

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
    return res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const [result] = await findById(id);
    return res.status(200).json(result);
});

module.exports = router;
