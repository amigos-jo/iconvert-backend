require('dotenv').config()
const superagent = require('superagent');

const CURRENCY_API_KEY = '37ad8f4959667bb1117ffad8d35667ba'
const handleCurrency = (req, res) => {
  // const query=req.query.x;
  // const queryArr=query.split(',');
  const fromCoin = req.query.fromCoin
  const toCoin=req.query.toCoin
  const amount =req.query.amount
// console.log(queryArr)


  // const Symbol=req.query.Symbol
  // const date=req.query.date
  // const cacheMemory={}
  const queryParam = {
    // Symbol:query,
    access_key: CURRENCY_API_KEY
  }

  const CurrencyUrl = `https://v6.exchangerate-api.com/v6/ea2e422feb34124fcd806b74/pair/${fromCoin}/${toCoin}/${amount}`;
  superagent.get(CurrencyUrl)
    .then(currData => {
      //   if (cacheMemory !== undefined){
      //       console.log('cache hit ') 
      //   res.send(cacheMemory[query])
      //   }else{
      //  const currArray=currData.body.data.map(data=>new COINS(data));
      // cacheMemory=currArray
      const rate = currData.body.conversion_result
      console.log(rate)
      res.status(200).send(rate.toString())
      // }
    }).catch(console.error)
}

module.exports = handleCurrency
