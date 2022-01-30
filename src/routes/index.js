const express = require('express');
const recordsController = require('../controllers/records')
const { body, validationResult } = require('express-validator');
const { formatResponse } = require('../helpers');

const router = express.Router();

router.post(
    '/',
    body('minCount').isNumeric(),
    body('maxCount').isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(formatResponse(null, 1, 'Invalid input format'));
        }
        return recordsController.queryRecords(req, res, next);
    })

module.exports = router;