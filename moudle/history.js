require('dotenv').config()
const superagent = require('superagent');

const gethistory=(req,res)=>{

    const historyUrl=`https://free.currconv.com/api/v7/convert?q=USD_PHP,PHP_USD&compact=ultra&date=[yyyy-mm-dd]&endDate=[yyyy-mm-dd]&apiKey=8f01d570bb9926d1a349`

    superagent.get(historyUrl)
}
module.exports=gethistory