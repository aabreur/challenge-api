const ItemsService = require('../services/items');
const { formatResponse } = require('../helpers');

exports.queryItems = async (req, res, next) => {
    res.json(formatResponse(
        await ItemsService.queryItems(
            req.body.startDate, 
            req.body.endDate,
            req.body.minCount,
            req.body.maxCount
    )));
}