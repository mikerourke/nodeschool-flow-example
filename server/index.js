/**
 * Sets up a mock server to make `fetch` calls to.
 * @see https://github.com/typicode/json-server
 */
const { blue } = require('chalk');
const jsonServer = require('json-server');

const PORT = 3001;

// Setup the server per the official documentation:
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

const router = jsonServer.router(`${__dirname}/db.json`);

// Ensure all routes are prefixed with `/api`:
server.use('/api', router);

server.listen(PORT, () => {
  console.log(blue(`Server is running on port ${PORT}.`));
});
