const express = require('express');
require('dotenv').config()
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes')
const routAuth=require('./routes/authRoute')
const app = express();
const port = process.env.port || 5000;

const db = 'mongodb+srv://gobi:foodmini@cluster0.h6phm.mongodb.net/Food?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => app.listen(port, () => {
        console.log(`listening to port ${port}`);
    }))
    .catch(err => console.log(err))

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('images'));

app.use('/profile', uploadRoutes);
app.use('/user',routAuth)










// const express = require('express');
// require('dotenv').config()
// const cors = require('cors');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const path = require('path');
// const uploadRoutes = require('./routes/uploadRoutes')
// const cookieParser = require('cookie-parser')
// const app = express();
// const routAuth=require('./routes/authRoute')


// const User = require('./models/userMod')

// mongoose.connect('mongodb://localhost:27017/minifood', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true
// })


// app.use(morgan('dev'));
// app.use(bodyParser.json());

// app.use(cors());



// app.use('/user',routAuth)

// app.use('/profile', uploadRoutes);

// const PORT=process.env.PORT || 5000
// app.listen(PORT,()=>{
//     console.log(`app on port ${PORT}`);

// })