// file to provide api hooks to get and set preferences of the application.
require('dotenv').config()

const mongoose = require('mongoose');
const mongouri = process.env.MONGODB_URL;


const express  = require('express');
const router = express.Router();
const bodyparser = require('body-parser');

mongoose.connect(mongouri,{useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;

db.on('error', console.error.bind(console,'Mongo DB Connection error:'))

const Preferences = require('./models/preferences');
const HomepageSettings = require('./models/homepage_settings');


router.use(bodyparser.json());

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

        res.json(res).status(201);
    });

    

});

router.post('/updateSections', (req, res) => {
    console.log(req.body);

    const sections = req.body.sections ? req.body.sections : null;

    if(!sections) { 
        res.send({
            success:false,
            error: 'Sections data cannot be empty.'
        });
    }

    // sections: [
        // {
        //     title:'',
        //     description:'',
        //     items: [
        //         {
        //             label:'',
        //             url:'',
        //             image:'',
        //         }
        //     ]
        // }

    // ]

    HomepageSettings.updateOne({name:"HomepageBlocks"},{
        name:'HomepageBlocks',
        sections: sections
    }, {upsert:true}, (err,document) => {
        if(err) res.json({...err,success:false,message:"There is an error saving the data."}).status(201)
        let finalResponse = {...document, success:true};
        res.json(finalResponse).status(200);
    })

});


router.get('/updateSections', (req,res) => {

    HomepageSettings.find({
        name:"HomepageBlocks"
    }, (err, document) => {
        
        res.json(document).status(200);

    })


});




module.exports = router;

// const S3 = require('aws-sdk/clients/s3');
// const AWS_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY || '';
// const AWS_SECRET_KEY = process.env.AWS_S3_SECRET_KEY || '';
// const AWS_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';
// const s3Instance = new S3({
//     accessKeyId:AWS_ACCESS_KEY,
//     secretAccessKey:AWS_SECRET_KEY
// });

