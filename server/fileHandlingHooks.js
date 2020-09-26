


const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { deserialize } = require('./api-util/sdk');

// S3 Settings

const S3 = require('aws-sdk/clients/s3');
const AWS_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY || '';
const AWS_SECRET_KEY = process.env.AWS_S3_SECRET_KEY || '';
const AWS_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';
const s3Instance = new S3({
    accessKeyId:AWS_ACCESS_KEY,
    secretAccessKey:AWS_SECRET_KEY
});





function uploadToAws({filename,filedata},cb) {

    var params = {
        Bucket:AWS_BUCKET_NAME,
        ACL:'public-read',
        Key: filename,
        Body:filedata
    };

    s3Instance.upload(params,(err,data) => {
        if(err){ 
            console.log('Error',err);
            cb(err);
        }

        cb(null,data);


    });

} 


router.post('/uploadFile',function (req,res) {
   
    let extraImage = req.files.extraImage;

    let randomString = Date.now().toString();
    let fileName = extraImage.name.split('.').shift();
    let extension = extraImage.name.split('.').pop();

    let saveFileName = `${fileName}${randomString}.${extension}`;
    
    // console.log(extraImage);
    // extraImage.mv('./uploads/'+saveFileName);
    uploadToAws({
        filename:saveFileName,
        filedata:extraImage.data
    }, (err,data) => {
        if(err) {console.log('Error while uploading to S3', err); return;}


        res.status(200).json({success:1,image_url:`${data.Location}`});

    });


    


});


// router.get('/getFile/:image_name',))


module.exports = router;