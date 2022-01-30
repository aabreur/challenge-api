const { MongoClient } = require('mongodb');
const config = require('../../config');

// Connection URL
const client = new MongoClient(config.mongo.URI);

exports.connect = async () => {
    // Connect the client to the server, this should happen only when app starts
    try {
        await client.connect();
        console.log("Connection to MongoDB successfully established.");
    } catch (error) {
        console.log("There was an error when connecting to MongoDB");
        console.log(error);
        throw error;
    }
}

exports.findByDate = async (startDate, endDate) => {
    const response = await client
        .db(config.mongo.dbName)
        .collection(config.mongo.collection)
        .find({
            createdAt: {
                "$gt": new Date(startDate),
                "$lt": new Date(endDate)
            }
        })
        .toArray();
    console.log('--------------------------======--------------------');
    console.log(response);
    return response;
}