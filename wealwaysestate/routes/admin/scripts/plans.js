let Category = require('../../../models/category');
let subCategoryModel = require('../../../models/subcategory');
let BrandModel = require('../../../models/brand_model');
const subcategory = require('../../../models/subcategory');

module.exports = {
    getSubcategory: async function (req, res) {
        let subCategory = await subCategoryModel.find({ category: req.params.id, "title": { "$exists": true } }).sort({ 'title': 1 });
        res.send(subCategory)
    },
    getBrandModel: async function (req, res) {
        let brandModel = await BrandModel.find({ brand: req.params.id, "title": { "$exists": true } }).sort({ 'title': 1 });
        res.send(brandModel)
        console.log(brandModel)
    },
}