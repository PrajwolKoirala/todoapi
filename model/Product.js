const mongoose = require("mongoose")
const{SELLER,BUYER} = require("../constsnts/role");
const { ObjectId } = mongoose.Schema;


const ProductsSchema = new mongoose.Schema({


    name: {
        type: String,
        required : true
    },
    price:{
        type:Number,
        min:0,
        default:0
        
    },
    description:{
        type : String,
    },
    images:{
        type: [String]
    },
    categories:{
        type: [String]
    },
    brands: {
        type:[String]
    },


    /*
        name:"qwe",
        price:100,
        created_by{
            name:"ram",
            email:"ram@.com"
        }

    */
    created_by:{
        type: ObjectId, //just like SQL..this is refrence to the id of users table/collection
        required:true,
        ref : "user"
    }


});



module.exports = mongoose.model("Product",ProductsSchema)
