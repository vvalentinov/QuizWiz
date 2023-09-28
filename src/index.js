const express = require('express');

const { PORT } = require('./constants/constants');

const { dbConfig } = require('./config/dbConfig');
const { expressConfig } = require('./config/expressConfig');
const { handlebarsConfig } = require('./config/handlebarsConfig');

const app = express();

dbConfig();
expressConfig(app);
handlebarsConfig(app);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
