const mongoose = require("mongoose")
const{SELLER,BUYER} = require("../constsnts/role");
const { exists } = require("../BASICS/modal/todo");
const { string } = require("joi");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SignupSchema = new Schema({


    name: {
        type: String,
        maxlength: 255,
        required : true
    },


    email: {
        type:String,
        required : true,
        validate: {
            validator : async function(value) {
                console.log({value});
               let exists = await mongoose.models.User.findOne({email:value})
                if (exists){

                    return false;
                }
                return true;
            },
            msg:"email already exsists"
        }
    },

    password:{
        type:String,
        required:true,
    },
    role:{
        type: String,
        enum : [SELLER, BUYER],
        set : function(value) {
            return value.toLowerCase()//BUyer lai pani manney vayo aba
        }
    },
    balance:{
        type:Number,
        default: 0,
        min : 0,
    }

});
//mongoose.models vaneko chai yeauta object ho jasle mondoose maa vako models lai hold garxa
//user refers to model name
//findOne vaneko mongoDB query operation ho
//await asynchronous


module.exports = mongoose.model("User",SignupSchema)
