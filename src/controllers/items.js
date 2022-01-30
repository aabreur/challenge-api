const ItemsService = require('../services/items')

exports.queryItems = async (req, res, next) => {
    res.json(
        await ItemsService.queryItems(
            req.body.startDate, 
            req.body.endDate,
            req.body.minCount,
            req.body.maxCount
        ));
}