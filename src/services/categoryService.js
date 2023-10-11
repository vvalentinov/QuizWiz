const Category = require('../models/Category');

exports.create = (categoryName) => Category.create({ name: categoryName });

exports.getAll = () => Category.find({});

exports.getCategoryId = async (categoryName) => {
    const category = await Category.findOne({ name: categoryName });
    return category._id;
};