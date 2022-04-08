const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const studentSchema = mongoose.Schema({
    mssv: {
        require: true,
        type: String,
    },
    name: {
        type: String,
        require: true,
    },
    course: {
        type: String,
    },
    majors: {
        type: String,
    },
    email: {
        type: String,
        require: true,
    },
    supplement: {
        type: String,
        default: null,
    },
    statusCheck: {
        type: Number,
        default: 4,
    },
    statusStudent: {
        type: String,
    },
    support: {
        type: Number,
        default: null,
    },
    phoneNumber: {
        type: Number,
        require: true,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    CV: {
        type: String,
        default: null,
    },
    campus_id: {
        type: ObjectId,
        ref: "Cumpus",
    },
    reviewer: {
        type: String,
        default: null,
    },
    form: {
        type: String,
        default: null
    },
    report: {
        type: String,
        default: null
    },
    //cong ty
    nameCompany: {
        type: String,
        default: null
    },
    addressCompany: {
        type: String,
        default: null
    },
    postCode: {
        type: Number,
        default: null
    },
    position: {
        type: String,
        default: null
    }
    ,
    phoneNumberCompany: {
        type: Number,
        default: null
    },
    emailEnterprise: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model("Student", studentSchema);