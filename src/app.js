const express = require( "express" );
const router = require('./routes');
const app = express();


const port = 8080;

app.use(express.json());
app.use(router);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );