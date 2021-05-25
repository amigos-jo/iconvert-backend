const mongoose = require('mongoose');
const { Schema } = mongoose;
const ratescoin = require('./CoinRate')
const superagent = require('superagent');
const coinSchema = new Schema({
    index: String,
    symboleCoin: String,

})
const pairSchema=new Schema({
pair:String,

})
const userSchema = new Schema({
    email: String,
    currency: [coinSchema],
    pairCurrency:[pairSchema]
});
const User = mongoose.model('User', userSchema);
  const getUser = async (req, res) => {
    const { email } = req.query
    User.find({ email: email }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        // console.log(result)
        result.length ? callCoin(result[0].currency) : callAdd(email)

    })
}
callCoin = async (coinSchema) => {
    const coinUrl = await `https://v6.exchangerate-api.com/v6/ea2e422feb34124fcd806b74/latest/${coinSchema[0].symboleCoin}`
    // console.log('coinSchema',coinSchema[0])

    superagent.get(coinUrl)
    .then(currData=>{
                const rate =currData.body.conversion_rates
                console.log('rate',rate)
     
const xx=[];
for(let i=0;i<coinSchema.length;i++){
    const x = {sym:'',rate:''}
    const sym=coinSchema[i].symboleCoin;
    x.sym=sym;
    x.rate=rate[sym];
    xx.push(x);
    // console.log('sym',rate);
}
   }).catch(console.error)
}

callAdd=(email)=>{
    const user = new User({
    email:email,
       currency: [
        {
            index: '0',
            symboleCoin: 'USD'
        }, 
        {
            index: '1',
            symboleCoin: 'JOD'
        }],
        pairCurrency:[
            {
                pair: 'EUR/JOD'
            }
        ],
});
user.save();
}
const user = new User({
    email: 'a',
    currency: [
        {
            index: '0',
            symboleCoin: 'JOD'
        },
        {
            index: '1',
            symboleCoin: 'USD'
        },
        {
            index: '2',
            symboleCoin: 'TRY'
        }
    ],
    pairCurrency:[
        {
            pair: 'USD/JOD'
        },
        {
            pair: 'TRY/EUR'    
        }
    ]
});
user.save();

// add new coins from user to server

const addUser = async (req, res) => {
    const { email } = req.query
    User.find({ email: email }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        // console.log(result)
        result.length ? callCoin(result[0].currency) : callAdd(email)

    })
}


mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongodb is connected!'));


module.exports={getUser,addUser}
