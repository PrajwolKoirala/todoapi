const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({

    title: {
        type:String,
        require : true ///aba chai title bina data post garna mildaina
    },
    status:Boolean,
});


module.exports = mongoose.model("Todo",TodoSchema)