const express = require( "express" );
const router = require('./routes');
const app = express();
const mongoClient = require('./components/mongoclient')


const port = 3000;

mongoClient.connect();
app.use(express.json());
app.use(router);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );