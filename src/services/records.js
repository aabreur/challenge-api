const mongoClient = require('../components/mongoclient');

exports.queryRecords = async (startDate, endDate, minCount, maxCount) => {
    const result = [];
    const queryResult = await mongoClient.findByDate(startDate, endDate);
    await queryResult.forEach(doc => {
        const countSum = doc.counts.reduce((sum, x) => sum + x, 0);
        if ((countSum >= minCount) && countSum <= maxCount) {
            result.push({
                key: doc.key,
                createdAt: doc.createdAt,
                totalCount: countSum
            })
        }
    })
    return result;
}