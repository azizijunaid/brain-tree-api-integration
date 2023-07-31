
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.route('/generateToken')
  .post((req, res) => paymentController.generateToken(req, res));

router
  .route('/checkout')
  .post((req, res) => paymentController.checkout(req, res));

module.exports = router;
