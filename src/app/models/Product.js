const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ProductSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    price: Number,
    image: String

}, {
  timestamps: true
});

ProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model('Product', ProductSchema)