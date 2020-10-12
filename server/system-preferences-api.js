// file to provide api hooks to get and set preferences of the application.
require('dotenv').config()

const mongoose = require('mongoose');
const mongouri = process.env.MONGODB_URL;


const express  = require('express');
const router = express.Router();

mongoose.connect(mongouri,{useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;

db.on('error', console.error.bind(console,'Mongo DB Connection error:'))

const Preferences = require('./models/preferences');


router.get('/savePreference',(req,res) => {

    const preference = Preferences.create({
        meta_key:'admin_email',
        meta_value: 'testing@gmail.com'
    },(err,res) => {
        if(err) {
            console.log(err);
            res.json({success:true})
            return;
        }
        
        console.log(res);
        res.json(res).status(201);
    });

    

})


module.exports = router;

// const S3 = require('aws-sdk/clients/s3');
// const AWS_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY || '';
// const AWS_SECRET_KEY = process.env.AWS_S3_SECRET_KEY || '';
// const AWS_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';
// const s3Instance = new S3({
//     accessKeyId:AWS_ACCESS_KEY,
//     secretAccessKey:AWS_SECRET_KEY
// });

