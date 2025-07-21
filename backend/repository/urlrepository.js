//all things related to database
// all interactions to DB
const Url=require('../models/Url');

async function storeUrl(shortid,longurl)
{
    const newurl=new Url({shorturl:shortid,longurl:longurl});
    return await newurl.save(); 
}
async function geturlbyshortid(shortid)
{
    return await Url.findOne({shorturl:shortid});
}

async function incrementcount(urlDoc)
{
    urlDoc.clickCount++;
    return await urlDoc.save();
}

module.exports ={storeUrl,geturlbyshortid,incrementcount}