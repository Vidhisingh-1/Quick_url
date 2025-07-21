const mongoose=require('mongoose');

const URLschema=new mongoose.Schema({
    shorturl:{
        type:String,
        unique:true
    },
    longurl:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    clickcount:{
        type:Number,
        default:0
    }
     
});

module.exports=mongoose.model('Url',URLschema);