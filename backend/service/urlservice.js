const express=require('express');
const Url=require('../models/Url');
const {storeUrl,geturlbyshortid}=require('../repository/urlrepository');
const nanoid=require('nanoid');
//assuming all validation and sanitization has been don
// then only it has reached till here
function isValidUrl(url)
{
    try{
        new URL(url);
        return true;
    }
    catch(err)
    {
        return false;
    }
}
async function shorten(longurl)
{
    try{
        if(!longurl)
        {
            throw new Error('URL is required');
        }
        if(!longurl.startsWith('http://') && !longurl.startsWith('https://')){
            longurl='http://'+longurl;
        }
        if(!isValidUrl(longurl))
        {
            throw new Error('Invalid URL');
        }
        const shortid=nanoid(6);
        const urlDoc=await storeUrl(shortid,longurl);
        return urlDoc;
    }
    catch(error)
    {
        throw new Error('Error creating short URL '+error.message);
    }
}
async function shortenurl(req,res,next){
    try{
        const {url}=req.body;
        if(!url){
            return res.status(400).json({error:'URL is required'});
        }
        const urlDoc=await shorten(url);
        res.json({
            shorturl:`https://${req.get('host')}/${urlDoc.shorturl}`
        });
    }
    //handled in middleware
    catch(err)
    {
        if(err.message.includes('Invalid URL')){
            return res.status(400).json({error:err.message});
        }
        next(err);
    }

}
async function redirectUrl(shortid)
{
    try{
        const urlDoc=await geturlbyshortid(shortid);
        if(!urlDoc)
        {
            throw new Error('URL not found');
        }
        console.log(urlDoc);
        await urlrepo.incrementcount(urlDoc);
        return urlDoc.longurl;
    }
    catch(error)
    {
        throw new Error('Error redirecting URL : '+error.message);
    }
}
module.exports={shortenurl,redirectUrl};