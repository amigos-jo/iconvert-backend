require('dotenv').config()
const superagent = require('superagent');

const CURRENCY_API_KEY = '37ad8f4959667bb1117ffad8d35667ba'
const handleCurrency = (req, res) => {
  const query=req.query.x;
  const queryArr=query.split(',');
  const fromCoin = queryArr[0]
  const toCoin=queryArr[1];
  const amount =queryArr[2];
console.log(queryArr)


  // const Symbol=req.query.Symbol
  // const date=req.query.date
  // const cacheMemory={}
  const queryParam = {
    // Symbol:query,
    access_key: CURRENCY_API_KEY
  }

  const CurrencyUrl = `https://v6.exchangerate-api.com/v6/b7b2eca6061ee4f6f0cd9cc3/pair/${fromCoin}/${toCoin}/${amount}`;
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

class COINS {
  constructor(coin) {
    this.base_code = coin.base_code
    this.target_code = coin.target_code
    this.conversion_rate = coin.conversion_rate
    // this.date=coin.date
    // this.rates=coin.rates
  }
}
module.exports = handleCurrency
