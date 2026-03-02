const Product = require('../models/Product');

class SiteController {
  async show(req, res, next) {
    try {
      const product = await Product.findOne({
        slug: req.params.slug
      }).lean();

      if (!product) {
        return res.status(404).send('Không tìm thấy sản phẩm');
      }

      // 🔥 Format giá sang USD string
      const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(product.price);

      res.render('site/Daimond', {
        product: {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          image: product.image || '/images/default.png',
          price: formattedPrice   // 👈 string USD
        }
      });

    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SiteController();