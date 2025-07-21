//using express-validator we can validate http requests
const {sanitizeBody}=require('express-validator');

const sanitizeinput= (req,res,next)=>
{
    try{
        if(req.body && typeof req.body.url=='string')
        {
            req.body.url=req.body.url.trim();
        }
        next();
    }
    catch(error)
    {
        next(error);
    }
}
module.exports={sanitizeinput}