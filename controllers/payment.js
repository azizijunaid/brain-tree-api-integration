const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

const generateToken = async (req, res) => {
  try {
    const { clientToken } = await gateway.clientToken.generate({});
    res.status(200).send({ status: true, clientToken });
  } catch (error) {
    res.status(500).send({ status: false, error: error });
  }
};

const checkout = async (req, res) => {
  try {
    console.log('body before parse', req.body);
    const body = req.body;

    const { paymentMethodNonce, deviceDataFromTheClient } = body;
    const data = await gateway.transaction.sale({
      amount: '10.00',
      paymentMethodNonce,
      deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    });

    console.log('data', data);
    res.status(200).send({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: false, error });
  }
};

module.exports = {
  generateToken,
  checkout,
};
