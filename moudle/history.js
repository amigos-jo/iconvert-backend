require('dotenv').config()
const superagent = require('superagent');

const gethistory=(req,res)=>{
    const fromCoin=req.query.fromCoin;
    const toCoin=req.query.toCoin

 
    const historyUrl=`https://free.currconv.com/api/v7/convert?q=${fromCoin}_${toCoin}&compact=ultra&date=2021-04-10&endDate=2021-04-15
&apiKey=8f01d570bb9926d1a349`
    // const historyUrl='/api/v7/convert?q=USD_PHP,PHP_USD&compact=ultra&apiKey=8f01d570bb9926d1a349'
    

    superagent.get(historyUrl).then(historyData=>{
        const historical=historyData.body
        console.log(Object.keys(historical))
        const resArray=[]
        // console.log(historical)
        res.send(historical)
    }).catch(console.error)
}
module.exports=gethistory