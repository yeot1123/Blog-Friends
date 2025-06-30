const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');



const storage = new CloudinaryStorage ({
  cloudinary,
  params:{
    folder: 'profile-photo',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
})


const upload_photo = multer({ storage });


module.exports = upload_photo
