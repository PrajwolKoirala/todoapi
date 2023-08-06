const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());//global middleware-runs each and every request
const createProducts = require("./products.js");
const{ fetchProducts } = require("./products.js");

mongoose.connect('mongodb://127.0.0.1:27017/todosDB')
  .then(() => console.log('Connected!')); 

let logged_in =true;

function checkAuthtiencation(req, res, next) {
    console.log("check");
    if (!logged_in) {
        console.log("ok");
        return res.status(401).send({ msg: "unauthenticated" });
    }
    next(); // Call next() to proceed to the next middleware or route handler
}

function checkAccess(req, res,next){
    let access = true;
    if(!access){
        return res.status(403).send({msg: "forbidden"})
    }
    next();
}

// app.use(checkAuthencation);

app.get('/todos', function (req, res) {
    res.send([
        { title: "one", status: false },
        { title: "two", status: true },
    ]);
});

app.get("/products", fetchProducts);

app.post('/products',checkAuthtiencation,checkAccess,createProducts);

app.post('/todos', checkAuthtiencation ,checkAccess, function (req, res) {
    // if (!logged_in) {
    //     return res.status(401).send({ msg: "unauthenticated" });
    // }
    res.send("data inserted");
});

app.listen(8090, () => {
    console.log("server started");
});


