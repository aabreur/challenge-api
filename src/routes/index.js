const express = require('express');
const itemsController = require('../controllers/items')

const router = express.Router();

router.post('/', itemsController.queryItems);

module.exports = router;