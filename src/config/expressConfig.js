const express = require('express');

exports.expressConfig = (app) => {
    app.use(express.static('src/public'));
    app.use(express.urlencoded({ extended: false }));
};