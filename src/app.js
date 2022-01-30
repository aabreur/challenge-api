const express = require( "express" );
const router = require('./routes');
const app = express();
const mongoClient = require('./components/mongoclient')

// connect to mongoDB
await mongoClient.connect();

// NODE_ENV variable is being set to production on ECS container
const port = process.env.NODE_ENV == 'production'
    ? 80
    : 3000

app.use(express.json());
app.use(router);

// start the Express server
app.listen( port, () => {
    console.log( `server started at port ${ port }` );
} );