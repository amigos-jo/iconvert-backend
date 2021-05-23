const express = require('express');
const app = express();
const cors = require('cors') ;
app.use(cors());
require('dotenv').config();
const mongoose = require('mongoose');
const handleCurrency=require('./moudle/Excoin');
const currencyRate=require('./moudle/CoinRate');
const user=require('./moudle/User');


const { Schema } = mongoose;

const PORT=process.env.PORT||3158;
app.get('/', function (req, res) {
  res.send('Hello FROM OUR ICONVERT BACKEND')
})
app.get('/excoin',handleCurrency);
app.get('/ratecoin',currencyRate);
app.get('/user',user.getUser)
app.post('/user',user.addUser)
app.post('/histoty',gethistory)
app.listen(PORT,()=>{console.log(`server at ${PORT}`)});