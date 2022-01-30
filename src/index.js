const app = require("./app");
const mongoClient = require('./components/mongoclient')

// connect to mongoDB
mongoClient.connect();

// NODE_ENV variable is being set to production on ECS container
const port = process.env.NODE_ENV == 'production'
    ? 80
    : 3000

app.listen(port, () => {
  console.log(`Server has started on port ${ port }`);
});