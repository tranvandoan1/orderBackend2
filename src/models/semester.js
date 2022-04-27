const mongoose = require('mongoose');
const semesterSchema = mongoose.Schema({
    name:{
        type:  String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Semester",semesterSchema);