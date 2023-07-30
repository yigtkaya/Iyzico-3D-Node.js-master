var Iyzipay = require('iyzipay');

var iyzipay = new Iyzipay({
    apiKey: process.env.IYZICOAPIKEY,
    secretKey: process.env.IYZICOSECRETKEY,
    uri: process.env.IYZICOLINK
});

async function pay(req, res) {
    try {
        const { cardHolderName, cardNumber,
            price, contactName, city, country, address, 
            surName, email,
             expireMonth, expireYear, cvc } = req.body;
        var request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: '123456789',
            price: price,
            paidPrice: price,
            currency: Iyzipay.CURRENCY.TRY,
            installment: '1',
            basketId: 'B67832',
            paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            paymentCard: {
                cardHolderName: cardHolderName,
                cardNumber: cardNumber,
                expireMonth: expireMonth,
                expireYear: expireYear,
                cvc: cvc
            },
            buyer: {
                id: 'BY789',
                name: contactName,
                surname: surName,
                email: email,
                identityNumber: '74300864791',
                registrationAddress: address,
                ip: '85.34.78.112',
                city: city,
                country: country,
                zipCode: '34732'
            },
            shippingAddress: {
                contactName: contactName,
                city: city,
                country: country,
                address: address,
                zipCode: '34742'
            },
            billingAddress: {
                contactName: contactName,
                city: city,
                country: country,
                address: address,
                zipCode: '34742'
            },
            basketItems: [
                {
                    id: 'BI102',
                    name: 'Game code',
                    category1: 'Game',
                    itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                    price: price
                }
            ]
        };
            iyzipay.payment.create(request, function (err, result) {
                console.log(err, result);
                res.status(200).send(result);
            });
    
    } catch (e) {
        res.send(`İşlem Başarısız ${e}`);
    }
}


module.exports = {
    pay,
}