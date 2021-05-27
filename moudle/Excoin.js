require('dotenv').config()

let apiUrl= process.env.APIURL;
const superagent = require('superagent');

const CURRENCY_API_KEY = '37ad8f4959667bb1117ffad8d35667ba'
const handleCurrency = (req, res) => {
  const fromCoin = req.query.fromCoin
  const toCoin=req.query.toCoin
  const amount =req.query.amount
  // const queryParam = {access_key: CURRENCY_API_KEY }


  const CurrencyUrl = `${apiUrl}/pair/${fromCoin}/${toCoin}/${amount}`;
  console.log(CurrencyUrl);
  superagent.get(CurrencyUrl)
    .then(currData => {
      
      const rate = currData.body.conversion_result
      console.log(rate)
      res.status(200).send(rate.toString())
      // }
    }).catch(console.error)
}

module.exports = handleCurrency
