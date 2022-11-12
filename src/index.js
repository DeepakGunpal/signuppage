const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const route = require('./route');
require('dotenv/config');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://637000d17145a92704d73c67--jovial-dusk-16c550.netlify.app/'
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', route)

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log('db connection established'));

app.listen(PORT, () => console.log('listening on port: http://localhost:' + PORT));