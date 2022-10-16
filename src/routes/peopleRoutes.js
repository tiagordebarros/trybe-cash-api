const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    const person = req.body;
    return res.status(201).json(person);
});

module.exports = router;
