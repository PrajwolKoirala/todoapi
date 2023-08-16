const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({

    title: {
        type:String,
        required : true ///aba chai title bina data post garna mildaina
    },
    status:{
        type:Boolean,
        required : true
    },
});


module.exports = mongoose.model("Todo",TodoSchema)

/*
module.exports{
    
}

*/
