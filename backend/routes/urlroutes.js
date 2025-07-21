const express=require('express');
const { shortenurl, redirectUrl } = require('../service/urlservice');
const router=express.Router();

//URL shortening endpoint
router.post('/shorten',shortenurl);

//URL redirection endpoint
router.get('/:shortid',async (req,res,next)=>{
    try{
        const longurl=await redirectUrl(req.params.shortid);
        res.redirect(longurl);//redirect function given by express
    }
    catch(error)
    {
        if(error.message==='URL not found'){
            return res.status(404).json({
                error:{
                    message:'Short URL not found'
                }
            });
        }
        next(error);
    }
});

module.exports=router;