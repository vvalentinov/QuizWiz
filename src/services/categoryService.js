const Category = require('../models/Category');

exports.create = (categoryName) => Category.create({ name: categoryName });