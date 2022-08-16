const express = require('express')
const multer = require('multer');
const morgan = require('morgan');
const port = process.env.PORT || 5000;
require('dotenv').config();
const connectDB = require('./config/db');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


const multerStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img');        
    },
    filename : (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-$(Date.now()).${ext}`);
    }
});

const upload = multer({
   storage : multerStore
});

app.post('/upload', upload.single('image'), require("./controller/controller"));


app.listen(port, () =>{
    connectDB();
    console.log(`🚀 @ http://localhost:${port}`)
  });