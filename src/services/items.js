const { MongoClient } = require('mongodb');
const config = require('../config');

// Connection URL
const client = new MongoClient(config.mongo.URI);

exports.queryItems = async (startDate, endDate, minCount, maxCount) => {
    const result = [];
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        //return await client.db(config.dbName).command({ ping: 1 });
        const collection = client
            .db(config.mongo.dbName)
            .collection(config.mongo.collection);
        
        const cursor = await collection.find({ 
            createdAt: { 
                "$gt": new Date(startDate),
                "$lt": new Date(endDate)
            }
        })
        await cursor.forEach(doc => {
            const countSum = doc.counts.reduce((sum, x) => sum + x, 0);
            if ((countSum >= minCount) && countSum <= maxCount) {
                result.push({
                    key: doc.key,
                    createdAt: doc.createdAt,
                    totalCount: countSum
                })
            }
        })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        return result;
    }
}