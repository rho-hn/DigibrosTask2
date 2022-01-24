const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    textData: {type: String},
});
module.exports=mongoose.model('Text',taskSchema);