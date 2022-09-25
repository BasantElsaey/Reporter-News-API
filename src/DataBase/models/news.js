
const mongoose = require('mongoose')
// const validator = require('validator')
const newsSchema = new mongoose.Schema({
    //properties
    title:{
        type:String,
        required:true,
        trim:true,  
        minlength: 6
    },
    description:{
        type:String,
        required : true,
        trim:true,
        minlength : 10
      
    },

    client:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Reporter'
    },
    userName:{
        type: String
    },
    
   
    
     image : {
        type : Buffer,
        
    },
 // TimeStamps
    // timestamps:{
    //     type:Date,
    //     default:Date.now
    //     }
    
    
        // timestamps: {
        //   createdAt : Date,
        //   modifiedAt: Date
        // }

        // {
        //     //     timestamps: {
        //     //       createdAt: "createdAt",
        //     //       updatedAt: "updatedAt",
        //     //     },
        //     //   } 
},

{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    
    }
    })

//  const timestamps = require('moorea-mongoose-timestamps');
 
// newsSchema.plugin(timestamps);

const News = mongoose.model('News', newsSchema);
module.exports = News
