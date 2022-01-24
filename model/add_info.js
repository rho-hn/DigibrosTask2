const mongoose = require('mongoose');
const textSchema = new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,

    textData: {
       
        type: String,
        
    },
    

});
module.exports=mongoose.model('Text',textSchema);