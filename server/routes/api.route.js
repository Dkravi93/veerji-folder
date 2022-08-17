const router = require('express').Router();
const postIt = require('./../controller/controller');
const multer = require('multer');

const multerStore = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/img');        
  },
  filename : (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      cb(null, `user-${Date.now()}.${ext}`);
  }
});

const upload = multer({
 storage : multerStore
});


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});


router.post('/uploads', upload.single('image'), postIt)

module.exports = router;
