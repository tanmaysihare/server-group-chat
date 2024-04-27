const AWS = require('aws-sdk');
//const path = require('path');
const {Messages,sequelize} = require('../models');

// AWS S3 setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Endpoint for file upload
exports.uploadFile = async (req, res) => {
  const file = req.file;
  const groupId = req.params.id;
  const userId = req.user.id;
  const senderName = req.user.name;
  let transaction;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ACL: 'public-read',
  };

  s3.upload(params, async(err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to upload file to S3.');
    }
    console.log('File uploaded successfully:', data.Location);
   
   try {
      transaction = await sequelize.transaction();
      const msg = await Messages.create({message: data.Location, UserId: userId,GroupId:groupId, senderName:senderName}, {transaction});
        
      await transaction.commit();
        return res.status(200).json({message: "File uploaded successfully",  msg});
      } catch (error) {
        if (transaction) await transaction.rollback();
        console.error('Error updating document URL:', error);
        return res.status(500).send('Failed to update document URL.');
      }
  });
}



 