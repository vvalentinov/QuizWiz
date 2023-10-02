const express = require('express');
const cookieParser = require('cookie-parser');

const { PORT } = require('./constants/constants');

const { dbConfig } = require('./config/dbConfig');
const { expressConfig } = require('./config/expressConfig');
const { handlebarsConfig } = require('./config/handlebarsConfig');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');

const { authenticate } = require('./middlewares/authMiddleware');

const routes = require('./routes');

const app = express();

dbConfig();
expressConfig(app);
handlebarsConfig(app);
cloudinaryConfig();

app.use(cookieParser());
app.use(authenticate);
app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
