


const express = require("express");

require("./config/database");

const fileUpload = require("express-fileupload");

const auth_route = require("./route/auth.js")
const product_route = require("./route/product.js")
const order_route = require("./route/order")
require('dotenv').config()


const app = express();
app.use(express.json());  // Parse JSON data//global middleware
app.use(express.urlencoded({ extended: true }));  // Parse 

app.use(fileUpload());//we can read data sent from form-data


app.use("/api", auth_route);
app.use("/api/products", product_route);
app.use("/api/orders", order_route);


app.use((req,res) => {
  res.status(404).send({
    msg:"Resoursce not found"
  })
})

app.use((err,req,res,next) => {
  let status = 500;
  let msg = "SERVER error";
  let errors = [];
  if (err.name === "ValidationError"){
    status = 400;
    msg = "bad request"
    
    let error_arr = Object.entries(err.errors)
    let temp = []
    error_arr.forEach(el => {
        let obj = {}
        obj.params = el[0]
        obj.msg = el[1].message
        temp.push(obj)
    }); 
    errors = temp;
}
res.status(status).send({msg: msg , errors,error:err.message})
return;
})




app.listen(8000, () => {
    console.log("Server started");
});
