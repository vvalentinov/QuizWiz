const handlebars = require('express-handlebars');

exports.handlebarsConfig = (app) => {
    const hbs = handlebars.create({
        helpers: {
            getCurrentYear() { return new Date().getFullYear() },
        },
        extname: 'hbs',
    });

    app.engine('hbs', hbs.engine);

    app.set('view engine', 'hbs');
    app.set('views', 'src/views');
};