const express = require('express');

const { PORT } = require('./constants/constants');

const { dbConfig } = require('./config/dbConfig');
const { expressConfig } = require('./config/expressConfig');
const { handlebarsConfig } = require('./config/handlebarsConfig');

const routes = require('./routes');

const app = express();

dbConfig();
expressConfig(app);
handlebarsConfig(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
