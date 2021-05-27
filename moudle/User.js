const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratescoin = require('./CoinRate')
const superagent = require('superagent');
const coinSchema = new Schema({
    index: String,
    symboleCoin: String,

})
const pairSchema = new Schema({
    pair: String,

})
const userSchema = new Schema({
    email: String,
    currency: [coinSchema],
    pairCurrency: [pairSchema]
});
const newArray =[];

const arrayTest =[];

function getRate (userPair) {
    // const coins = userPair.split('/')
  
    // const CurrencyUrl = `https://v6.exchangerate-api.com/v6/ea2e422feb34124fcd806b74/pair/${coins[0]}/${coins[1]}/1`;
    // superagent.get(CurrencyUrl)
    // .then(currData => {
    //   const rate = currData.body.conversion_result
    //   console.log('this is rate',rate)
    // //   res.status(200).send(rate.toString())
    // arrayTest.push(rate)
    // return (rate.toString())
  
    // }).catch(console.error)
  }


const User = mongoose.model('User', userSchema);
const getUser = async (req, res) => {
    const { email } = req.query
    User.find({ email: email }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        // console.log(result)
        const xy = {body:
            {
            "fCoin": "JOD",
            "sCoin": "PHP",
            "email": "dina.faur@yahoo.com"
          }}
          const yx = 'hhhh'
        // addPair(xy,yx)
        result.length && 

            // callCoin(result[0].currency) 
            // console.log('=======================');
            // console.log(result[0].pairCurrency.map(element=> element.pair));
            // console.log('=======================');
        res.send(result[0].pairCurrency.map(element=> element.pair))
            // : callAdd(email)
            // result[0].pairCurrency.map(element=> {
            //     const coins = element.pair.split('/')
            //     const CurrencyUrl = `https://v6.exchangerate-api.com/v6/ea2e422feb34124fcd806b74/pair/${coins[0]}/${coins[1]}/1`;
            //     superagent.get(CurrencyUrl)
            //     .then(currData => {
            //       const rate = currData.body.conversion_result
            //       console.log('this is rate',rate)
                //   res.status(200).send(rate.toString())
            //     arrayTest.push(rate)
            //     return (rate.toString())
            //   this.res.send(rate.toString())
            //     }).catch(console.error)
            // });
          console.log('this is new array',newArray);
          console.log('this is new arrayTest',arrayTest);
    })
}
callCoin = async (coinSchema) => {
    const coinUrl = await `https://v6.exchangerate-api.com/v6/c436e47e6b7020331ea6005f/latest/${coinSchema[0].symboleCoin}`
    // console.log('coinSchema',coinSchema[0])

    superagent.get(coinUrl)
        .then(currData => {
            const rate = currData.body.conversion_rates
            console.log('rate', rate)

            const xx = [];
            for (let i = 0; i < coinSchema.length; i++) {
                const x = { sym: '', rate: '' }
                const sym = coinSchema[i].symboleCoin;
                x.sym = sym;
                x.rate = rate[sym];
                xx.push(x);
                // console.log('sym',rate);
            }
        }).catch(console.error)
}


callAdd = (email) => {
    const user = new User({
        email: email,
        currency: [
            {
                index: '0',
                symboleCoin: 'USD'
            },
            {
                index: '1',
                symboleCoin: 'JOD'
            }],
        pairCurrency: [
            {
                pair: 'EUR/JOD'
            }
        ],
    });
    user.save();
}
const user = new User({
    email: 'dina.faur@yahoo.com',
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
    pairCurrency: [
        {
            pair: 'USD/JOD'
        },
        {
            pair: 'TRY/EUR'
        }
   ,
        {
            pair: 'USD/JOD'
        },
        {
            pair: 'PHP/EUR'
        }
   ,
        {
            pair: 'USD/JOD'
        },
        {
            pair: 'JOD/AUD'
        },
        {
            pair: 'EUR/AUD'
        }
    ],
});
// user.save();

// add new coins from user to server

const addUser = async (req, res) => {
    const { email } = req.query
    User.find({ email: email }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        // console.log(result)
        // result.length ? callCoin(result[0].currency) : callAdd(email)
        // res.send(result[0].pairCurrency)

    })
}


function createBook(req, res) {
    const { name, description, status, email } = req.body;
    userModel.find({ email: email }, (error, ownerData) => {
        ownerData[16].book.push({
            name: name,
            description: description,
            status: status
        })
        ownerData[16].save();
        res.send(ownerData[16].book);
    })
}


function addPair(req,res)  {
    const {  email, fCoin , sCoin } = req.body;
    // console.log(req.body);
    User.find({ email: email },(error, ownerData) => {
        ownerData[0].pairCurrency.push({
            pair :`${fCoin}/${sCoin}`
        })
        ownerData[0].save();
        res.send(ownerData[0].pairCurrency.map(element=> element.pair))
        // console.log('this is ownerdata',ownerData );
        // ownerData[0].user.push({
        //     name: name,
        //     description: description,
        //     status: status
        // })
        // ownerData[16].save();
        // res.send(ownerData[16].book)
    } 
    )

}

function deletePair(req, res) {
    const index = Number(req.params.id);
    // console.log(req.params);
    const { email } = req.query;
    User.find({ email: email }, (error, ownerData) => {
        const newArrayOfCoin = ownerData[0].pairCurrency.filter((element, indEl) => {
            return indEl !== index;
        });
        ownerData[0].pairCurrency = newArrayOfCoin;
        ownerData[0].save();
        res.send(ownerData[0].pairCurrency.map(element=> element.pair))
        // if (err) {res.send(`YOU GOT AN ERROR! your error: ${err}`)};
    });
}

mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => console.log('mongodb is connected!'));


module.exports = { getUser, addUser,addPair,deletePair }
