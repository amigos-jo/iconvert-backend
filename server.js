const express = require('express');
const app = express();
const cors = require('cors') ;
app.use(cors());
app.use(express.json());
require('dotenv').config();
const mongoose = require('mongoose');
const handleCurrency=require('./moudle/Excoin');
const currencyRate=require('./moudle/CoinRate');
const user=require('./moudle/User');
const gethistory=require('./moudle/history')


const { Schema } = mongoose;

const PORT=process.env.PORT||3158;
app.get('/', function (req, res) {
  res.send('Hello FROM OUR ICONVERT BACKEND')
})
app.get('/excoin',handleCurrency);
app.get('/ratecoin',currencyRate);
app.get('/user',user.getUser)
app.get('/history',gethistory)
app.post('/user',user.addUser)
app.post('/user',user.addPair)
app.delete('/user/:id',user.deletePair)
app.listen(PORT,()=>{console.log(`server at ${PORT}`)});