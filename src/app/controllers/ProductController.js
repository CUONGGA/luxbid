const Product = require('../models/Product');
const slugify = require('slugify');
const Auction = require('../models/Auction');

class ProductController{
    // [GET] /products/create
    create(req, res) {
        res.render('site/create');
    }

    // [POST] /products/store
    async store(req, res, next) {
    try {
      const product = new Product({
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true, strict: true }),
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
      });

      await product.save();
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }

   // [GET] /products/:slug
  async show(req, res, next) {
    try {
      const product = await Product.findOne({ slug: req.params.slug });

      if (!product) {
        return res.status(404).send('Không tìm thấy sản phẩm');
      }

      res.render('products/show', { product });
    } catch (err) {
      next(err);
    }
  }

  // [GET] /products/:id/edit
  async edit(req, res, next) {
    try {
      const product = await Product.findById(req.params.id).lean();
      console.log(product);
      res.render('site/update', { product });
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /products/:id
  async update(req, res, next) {
    try {
      await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true, strict: true }),
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
      });

      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }


  // [GET] /products/listProduct
async listProduct(req, res, next) {
  try {

    let products = [];
    let bidProductIds = [];

    // 👑 ADMIN thấy tất cả
    if (req.user && req.user.role === 'admin') {
      products = await Product.find({}).lean();
    }

    // 👤 USER chỉ thấy sản phẩm đã đấu giá
    if (req.user && req.user.role === 'user') {

      const auctions = await Auction.find({
        userId: req.user._id
      }).lean();

      bidProductIds = auctions.map(a => a.productId.toString());

      products = await Product.find({
        _id: { $in: bidProductIds }
      }).lean();
    }

    res.render('me/product', {
      products,
      bidProductIds,
      bidSuccess: req.query.bidSuccess
    });

  } catch (err) {
    next(err);
  }
}

  // PATCH /:id/delete
  async delete(req, res, next) {
    try {
      await Product.delete({ _id: req.params.id });
      res.redirect(req.get('referer') || '/');
    } catch (err) {
      next(err);
    }
  }


  // DELETE /:id/force
  async forceDelete(req, res, next) {
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.redirect(req.get('referer') || '/');
    } catch (err) {
      next(err);
    }
  }
  // PATCH /:id/restore
  async restore(req, res, next) {
    try {
      await Product.restore({ _id: req.params.id });
      res.redirect(req.get('referer') || '/');
    } catch (err) {
      next(err);
    }
  }

  async trash(req, res, next) {
  try {
    const products = await Product.findDeleted().lean();
    res.render('me/trash', { products });
  } catch (err) {
    next(err);
    }
  }

  async handleFormAction(req, res, next) {
  switch (req.body.action) {
    case 'delete':
      await Product.delete({ _id: { $in: req.body.IDProducts } });
      res.redirect(req.get('referer') || '/');
      break;

    default:
      res.json({ message: 'Action không hợp lệ' });
  }
}
// [POST] /products/bid/:id
  async bid(req, res, next) {
    try {
      const productId = req.params.id;
      const bidPrice = Number(req.body.bidPrice);
      const phone = req.body.phone;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).send('Không tìm thấy sản phẩm');
      }

      if (bidPrice <= product.currentPrice) {
        return res.send(`
          <script>
            alert("Giá phải lớn hơn giá hiện tại!");
            window.history.back();
          </script>
        `);
      }

      // ✅ Cập nhật giá sản phẩm
      product.currentPrice = bidPrice;
      product.lastBidder = req.user._id;
      await product.save();

      // ✅ TẠO BẢN GHI AUCTION
      await Auction.create({
        productId: product._id,
        userId: req.user._id,
        email: req.user.email,
        bidPrice: bidPrice,
        phone: phone
      });

      // Redirect về list
      res.redirect('/products/listProduct?bidSuccess=true');

    } catch (error) {
      next(error);
    }
  }
  async index(req, res, next) {
  try {
    const products = await Product.find({});

    res.render('products/list', {
      products,
      bidSuccess: req.query.bidSuccess  // 👈 thêm dòng này
    });

  } catch (error) {
    next(error);
  }
}
}

module.exports = new ProductController();