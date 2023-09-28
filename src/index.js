const express = require('express');

const { PORT } = require('./constants/constants');

const { expressConfig } = require('./config/expressConfig');

const app = express();

expressConfig(app);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
