const mongoose=require('mongoose');
const TaskSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});
const Task=mongoose.model('Task',TaskSchema);
module.exports=Task;