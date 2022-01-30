const RecordsService = require('../services/records');
const { formatResponse } = require('../helpers');

exports.queryRecords = async (req, res, next) => {
    res.json(formatResponse(
        await RecordsService.queryRecords(
            req.body.startDate, 
            req.body.endDate,
            req.body.minCount,
            req.body.maxCount
    )));
}