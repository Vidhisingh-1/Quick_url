const rateLimit=require('express-rate-limit');

//allows 100 requests per 15 minutes

const limiter=rateLimit({
    windowMs:15*60*1000,// 15 minutes sec->miliseconds
    max:3,
    message:'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders:true,
    legacyHeaders:false,
});

module.exports=limiter;