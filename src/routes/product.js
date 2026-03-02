const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const requireAdmin = require('../app/middlewares/requireAdmin');
const authMiddleware = require('../app/middlewares/AuthMiddleware');

router.get('/create', requireAdmin ,productController.create);
router.post('/store', productController.store);
router.get('/listProduct', productController.listProduct);
router.get('/me/trash', requireAdmin ,productController.trash);
router.delete('/me/form-action/delete', requireAdmin, productController.handleFormAction);
router.post('/bid/:id', authMiddleware.requireAuth, productController.bid);
router.patch('/:id/restore', productController.restore);
router.delete('/:id/force', productController.forceDelete);
router.delete('/:id/delete', productController.delete);
router.get('/:id/edit', requireAdmin, productController.edit);
router.put('/:id/update', requireAdmin, productController.update);
router.get('/:slug', productController.show);


module.exports = router;