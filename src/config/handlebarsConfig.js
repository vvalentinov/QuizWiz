const handlebars = require('express-handlebars');

const { APP_NAME } = require('../constants/constants');

require('dotenv').config();

exports.handlebarsConfig = (app) => {
    const hbs = handlebars.create({
        helpers: {
            getAppName() { return APP_NAME },
            getCurrentYear() { return new Date().getFullYear() },
            get404PageUrl() { return process.env.CLOUDINARY_404_URL },
        },
        extname: 'hbs',
    });

    app.engine('hbs', hbs.engine);

    app.set('view engine', 'hbs');
    app.set('views', 'src/views');
};