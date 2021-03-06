require('dotenv').config()
const superagent = require('superagent');

const CURRENCY_API_KEY='37ad8f4959667bb1117ffad8d35667ba'
const currencyRate=(req,res)=>{
    const base=req.query.base
    const queryParam={
        // Symbol:query,
        access_key:CURRENCY_API_KEY
    }
    
    const CurrencyUrl=`https://v6.exchangerate-api.com/v6/ea2e422feb34124fcd806b74/latest/${base}`;
    superagent.get(CurrencyUrl)
     .then(currData=>{
        //   if (cacheMemory !== undefined){
        //       console.log('cache hit') 
            //   res.send(cacheMemory[query])
        //   }else{
            //  const currArray=currData.body.data.map(data=>new COINS(data));
            // cacheMemory=currArray
            const rate=currData.body.conversion_rates
            console.log(rate)
            res.status(200).send(rate)
        // }
    }).catch(console.error)
}

class COINS{
    constructor(coin){
        this.base_code=coin.base_code
        this.target_code=coin.target_code
        this.conversion_rate=coin.conversion_rate
        // this.date=coin.date
        // this.rates=coin.rates
    }
}
module.exports=currencyRate
