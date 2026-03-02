const Auction = require('../models/Auction');

class AuctionController {

  async store(req, res, next) {
    try {
      const { productId, name, email, phone, bidPrice } = req.body;

      await Auction.create({
        productId: productId,
        userId: req.user._id,
        name: req.body.name,
        email: req.body.email,
        phone: phone,
        bidPrice: bidPrice
      });
      req.session.bidSuccess = true;
      res.redirect(req.get('referer') || '/'); // quay lại trang chi tiết

    } catch (err) {
      next(err);
    }
  }

}

module.exports = new AuctionController();