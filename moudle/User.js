const mongoose = require('mongoose');
const { Schema } = mongoose;

const superagent = require('superagent');

const pairSchema = new Schema({
    pair: String,

})
const userSchema = new Schema({
    email: String,
    
    pairCurrency: [pairSchema]
});
const newArray =[];

const arrayTest =[];


const User = mongoose.model('User', userSchema);
const getUser = async (req, res) => {
    const { email } = req.query
    User.find({ email: email }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        result.length && 
        res.send(result[0].pairCurrency.map(element=> element.pair))
           
            //     return (rate.toString())
            //   this.res.send(rate.toString())
            //     }).catch(console.error)
            // });
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
                
            }
        }).catch(console.error)
}


callAdd = (email) => {
    const user = new User({
        email: email,
        pairCurrency: [
            {   pair: 'EUR/JOD'
            }
        ]    });
    user.save();
}
const user = new User({
    email: 'dina.faur@yahoo.com',
       pairCurrency: [
        {pair: 'USD/JOD'},
        {   pair: 'TRY/EUR'
        }   ,
        {   pair: 'USD/JOD'
        },
        {   pair: 'PHP/EUR'
        }   ,
        {   pair: 'USD/JOD'
        },
        {  pair: 'JOD/AUD'
        },
        {   pair: 'EUR/AUD'
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
    const {  email, fCoin , sCoin } = req.query;
    console.log(req.query);
    User.find({ email: email },(error, ownerData) => {
        ownerData[0].pairCurrency.push({
            pair :`${fCoin}/${sCoin}`
        })
        ownerData[0].save();
        res.send(ownerData[0].pairCurrency.map(element=> element.pair))
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
