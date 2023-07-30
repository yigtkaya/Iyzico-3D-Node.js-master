const router = require('express').Router();
const iyzicoController = require('../controller/iyzico')

router.post('/pay', iyzicoController.pay);


module.exports = router;