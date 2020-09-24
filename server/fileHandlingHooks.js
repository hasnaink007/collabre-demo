


const express = require('express');
const bodyParser = require('body-parser');
const { deserialize } = require('./api-util/sdk');

const {Storage} = require('@google-cloud/storage');

const router = express.Router();



router.post('/uploadFile',function (req,res) {
   
    let extraImage = req.files.extraImage;

    let randomString = Date.now().toString();
    let fileName = extraImage.name.split('.').shift();
    let extension = extraImage.name.split('.').pop();

    let saveFileName = `${fileName}${randomString}.${extension}`;
    
    // console.log(extraImage);
    extraImage.mv('./uploads/'+saveFileName);



    res.status(200).json({success:1,image_url:`/${saveFileName}`});


});


// router.get('/getFile/:image_name',))


module.exports = router;