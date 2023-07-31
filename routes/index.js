const express = require('express');
const router = express.Router();


router.use('/payment', require('./payment'));



router.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness',
  })
);


module.exports = router;

