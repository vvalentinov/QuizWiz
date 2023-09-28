const express = require('express');

const { PORT } = require('./constants/constants');

const { expressConfig } = require('./config/expressConfig');
const { handlebarsConfig } = require('./config/handlebarsConfig');

const app = express();

expressConfig(app);
handlebarsConfig(app);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
