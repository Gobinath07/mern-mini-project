const express = require('express');
const router = express.Router();
const mulupload = require('../mulupload');
const UploadModel = require('../models/uploadModel')

router.post('/post', mulupload.array('images'), async (req, res) => {
    console.log(req.files);
    let imageArray = []
    req.files.forEach(element => {
        console.log(element.filename);
        const file = {
            filename: element.filename,
            path: element.path
        }
        imageArray.push(file)
    })
    console.log(req.body);
    // var fullpath = req.file.path;
    var document = {
        Foodname: req.body.Foodname,
        Quantity: req.body.Quantity,
        Description: req.body.Description,
        Date: req.body.Date,
        City: req.body.City,
        State: req.body.State,
        Zip: req.body.Zip,
        Mobile: req.body.Mobile,
        files: imageArray
    }
    console.log(document)

    var upload = new UploadModel(document);
    await upload.save()
        .then(() => res.send('Uploaded DB'))
        .catch((err) => res.status(400).json('Error'))

    // console.log(req.file.filename);
});

router.get('/images', (req, res) => (

    UploadModel.find().sort({ createdAt: -1 })
        .then(images => {
            // console.log(images);
            res.send(images)
        })
        .catch(err => res.status(400).json('Error'))
)
);

module.exports = router;