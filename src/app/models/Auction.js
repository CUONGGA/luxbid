const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {                      // ✅ THÊM
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  phone: String ,
  email: String,
  bidPrice: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Auction', AuctionSchema);