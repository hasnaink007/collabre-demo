

require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const { tokensToFunction } = require('path-to-regexp');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)
const router = express.Router();

router.use(bodyParser.json());

// config.stripeSecretKey
router.post('/chargePayment',function (req,res) {
    const { token,values }= req.body;
    let membershipFee = 300;

// return 1;
    // converting in cents
    let feeForStripe = membershipFee * 100;

    stripe.charges.create({
            amount:feeForStripe,
            currency:process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY,
            source:token.id,
            description:`Membership payment from ${values.name}`
    },
    (err,charge) => {

        if(err) {
            return res.status(200).json({
                success:false,
            })
        }

        return res.status(200).json({
            success:true,
            paymentDetails:{
                trxID:charge.id,
                amount:membershipFee
            }
        })

    })


})


module.exports = router;