const mongoose = require('mongoose');
const managerSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    campus:{
        type:mongoose.Schema.ObjectId,
        ref:"Cumpus",
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Manager", managerSchema);