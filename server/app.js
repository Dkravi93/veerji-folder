const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));



app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
   console.log(`🚀 @ http://localhost:${PORT}`)
});



// const express = require('express')
// const multer = require('multer');
// const morgan = require('morgan');
// const port = process.env.PORT || 5000;
// require('dotenv').config();
// const connectDB = require('./server/config/db');
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(morgan('dev'));


// const multerStore = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img');        
//     },
//     filename : (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user.id}-$(Date.now()).${ext}`);
//     }
// });

// const upload = multer({
//    storage : multerStore
// });

// app.post('/upload', upload.single('image'), require("./server/controller/controller"));


// app.listen(port, () =>{
//     connectDB();
//     console.log(`🚀 @ http://localhost:${port}`)
//   });
