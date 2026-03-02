const Product = require('../models/Product');

class HomeController {
  async index(req, res, next) {
  try {
    const products = await Product.find({}).lean();

    const formattedProducts = products.map(product => ({
      ...product,
      price: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(product.price)
    }));

    res.render('home', {
      products: formattedProducts
    });

  } catch (error) {
    next(error);
  }
}
}

module.exports = new HomeController();